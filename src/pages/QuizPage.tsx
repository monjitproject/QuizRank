import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { mockSSCGDQuiz } from '../data/quizData';
import { Clock, ChevronLeft, ChevronRight, Bookmark, SkipForward, Flag, CheckCircle, XCircle, AlertCircle, Share2, Download } from 'lucide-react';

type QuizState = 'intro' | 'playing' | 'review' | 'result';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  subject?: string;
  difficulty?: string;
}

export default function QuizPage() {
  const { isDarkMode, setCurrentPage, currentQuiz, addQuizResult } = useApp();
  const quiz = currentQuiz || mockSSCGDQuiz;

  const questions: QuizQuestion[] = quiz.questions || mockSSCGDQuiz.questions;
  const totalQ = questions.length;
  const duration = quiz.duration || 60;
  const quizTitle = quiz.title || 'SSC GD Constable 2024 Full Mock Test';

  const [state, setState] = useState<QuizState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(totalQ).fill(null));
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [bookmarkedQs, setBookmarkedQs] = useState<number[]>([]);
  const [flaggedQs, setFlaggedQs] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    const correct = answers.filter((a, i) => a === questions[i]?.correct).length;
    const incorrect = answers.filter((a, i) => a !== null && a !== questions[i]?.correct).length;
    const score = correct * 2 - incorrect * 0.5;

    addQuizResult({
      quizId: quiz.id || 'mock',
      title: quizTitle,
      score: Math.round(score),
      total: totalQ * 2,
      date: new Date().toISOString(),
      timeTaken: duration * 60 - timeLeft,
      correct,
      incorrect,
      skipped: answers.filter(a => a === null).length,
    });
    setState('result');
  }, [answers, questions, timeLeft, quiz, totalQ, addQuizResult, isSubmitted, quizTitle, duration]);

  useEffect(() => {
    if (state !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state, handleSubmit]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (answers[currentQ] !== null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => {
        const next = prev + 1;
        setShowExplanation(answers[next] !== null);
        return next;
      });
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => {
        const prev2 = prev - 1;
        setShowExplanation(answers[prev2] !== null);
        return prev2;
      });
    }
  };

  const navigateToQuestion = (qi: number) => {
    setCurrentQ(qi);
    setShowExplanation(answers[qi] !== null);
  };

  const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;
  const incorrectCount = answers.filter((a, i) => a !== null && a !== questions[i]?.correct).length;
  const skippedCount = answers.filter(a => a === null).length;
  const scorePercent = Math.round((correctCount / totalQ) * 100);
  const answered = answers.filter(a => a !== null).length;
  const progress = (answered / totalQ) * 100;
  const timerClass = timeLeft < 300 ? 'timer-danger' : timeLeft < 600 ? 'timer-warning' : '';

  if (state === 'intro') {
    return (
      <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-blue-600 hover:underline text-sm mb-6">
            <ChevronLeft size={16} /> Back to Home
          </button>
          <div className={`rounded-3xl overflow-hidden shadow-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
              <div className="text-4xl mb-3">📝</div>
              <h1 className="text-2xl font-black mb-2">{quizTitle}</h1>
              <p className="text-blue-100 text-sm">Practice with latest exam pattern questions</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '❓', label: 'Questions', value: `${totalQ}` },
                  { icon: '⏱️', label: 'Duration', value: `${duration} min` },
                  { icon: '📊', label: 'Max Score', value: `${totalQ * 2}` },
                  { icon: '⚠️', label: 'Negative', value: '-0.25' },
                ].map((item, i) => (
                  <div key={i} className={`rounded-2xl p-4 text-center border ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div className={`rounded-2xl p-5 border mb-6 ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-blue-100 bg-blue-50'}`}>
                <h3 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📋 Instructions</h3>
                <ul className={`text-sm space-y-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• Each correct answer carries 2 marks</li>
                  <li>• Each wrong answer deducts 0.5 marks</li>
                  <li>• Unattempted questions carry 0 marks</li>
                  <li>• You can navigate between questions using the panel</li>
                  <li>• You can bookmark questions for review</li>
                  <li>• Timer will auto-submit when time runs out</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setState('playing'); setTimeLeft(duration * 60); setAnswers(new Array(totalQ).fill(null)); setCurrentQ(0); setIsSubmitted(false); }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all text-base btn-ripple"
                >
                  🚀 Start Quiz
                </button>
                <button onClick={() => setCurrentPage('home')} className={`px-6 py-4 rounded-2xl font-semibold border text-sm ${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'result') {
    return (
      <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-3xl overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} mb-6`}>
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white text-center">
              <div className="text-5xl mb-3">{scorePercent >= 80 ? '🏆' : scorePercent >= 60 ? '⭐' : scorePercent >= 40 ? '👍' : '📚'}</div>
              <h2 className="text-2xl font-black mb-2">Quiz Completed!</h2>
              <p className="text-blue-100">{quizTitle}</p>
            </div>
            <div className="p-8">
              <div className="flex justify-center mb-8">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke={isDarkMode ? '#334155' : '#e5e7eb'} strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none"
                      stroke={scorePercent >= 80 ? '#10B981' : scorePercent >= 60 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45 * scorePercent / 100} ${2 * Math.PI * 45}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{scorePercent}%</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{Math.round(correctCount * 2 - incorrectCount * 0.5)} / {totalQ * 2}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-2xl bg-green-50 border border-green-100">
                  <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-green-600">{correctCount}</div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-red-50 border border-red-100">
                  <XCircle size={24} className="text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-red-600">{incorrectCount}</div>
                  <div className="text-xs text-gray-500">Incorrect</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <AlertCircle size={24} className="text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-600">{skippedCount}</div>
                  <div className="text-xs text-gray-500">Skipped</div>
                </div>
              </div>
              <div className={`rounded-2xl p-4 mb-6 text-center ${scorePercent >= 80 ? 'bg-green-50 border border-green-100' : scorePercent >= 60 ? 'bg-yellow-50 border border-yellow-100' : 'bg-red-50 border border-red-100'}`}>
                <p className={`font-semibold text-sm ${scorePercent >= 80 ? 'text-green-700' : scorePercent >= 60 ? 'text-yellow-700' : 'text-red-700'}`}>
                  {scorePercent >= 80 ? '🎉 Excellent! You are exam ready!' : scorePercent >= 60 ? '👍 Good performance! Keep practicing.' : '📚 Need more practice. Review the questions below.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setState('review')} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl text-sm btn-ripple">
                  📋 Review Answers
                </button>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-green-500 text-green-600 font-semibold text-sm hover:bg-green-50">
                  <Share2 size={16} /> Share
                </button>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-blue-500 text-blue-600 font-semibold text-sm hover:bg-blue-50">
                  <Download size={16} /> PDF
                </button>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <button onClick={() => { setState('intro'); }} className={`flex-1 py-3 rounded-xl font-semibold border text-sm ${isDarkMode ? 'border-slate-600 text-gray-300' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  🔄 Retry
                </button>
                <button onClick={() => setCurrentPage('home')} className={`flex-1 py-3 rounded-xl font-semibold border text-sm ${isDarkMode ? 'border-slate-600 text-gray-300' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  🏠 Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'review') {
    return (
      <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setState('result')} className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
              <ChevronLeft size={16} /> Back to Results
            </button>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Answer Review</h2>
          </div>
          <div className="space-y-4">
            {questions.map((q, qi) => {
              const userAnswer = answers[qi];
              const isCorrect = userAnswer === q.correct;
              const isSkipped = userAnswer === null;
              return (
                <div key={qi} className={`rounded-2xl border p-5 ${isCorrect ? 'border-green-200 bg-green-50' : isSkipped ? isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-100 bg-white' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${isCorrect ? 'bg-green-500 text-white' : isSkipped ? 'bg-gray-300 text-gray-700' : 'bg-red-500 text-white'}`}>
                      {qi + 1}
                    </span>
                    <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{q.question}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt: string, oi: number) => {
                      let cls = isDarkMode ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-700';
                      if (oi === q.correct) cls = 'bg-green-100 border-green-300 text-green-700 font-semibold';
                      if (oi === userAnswer && !isCorrect) cls = 'bg-red-100 border-red-300 text-red-700 line-through';
                      return (
                        <div key={oi} className={`px-3 py-2 rounded-xl border text-xs ${cls}`}>
                          <span className="font-bold">{String.fromCharCode(65 + oi)}.</span> {opt}
                          {oi === q.correct && <span className="ml-1 text-green-600">✓</span>}
                          {oi === userAnswer && !isCorrect && <span className="ml-1 text-red-600">✗</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div className={`p-3 rounded-xl text-xs ${isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-blue-50 text-blue-800'}`}>
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  const currentQuestion = questions[currentQ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Quiz Header */}
      <div className={`sticky top-16 z-40 border-b shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setState('intro')} className={`p-1.5 rounded-lg ${isDarkMode ? 'text-gray-400 hover:bg-slate-700' : 'text-gray-500 hover:bg-gray-100'}`}>
                <ChevronLeft size={18} />
              </button>
              <div className="min-w-0">
                <div className={`font-bold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{quizTitle}</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Q {currentQ + 1} of {totalQ}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 font-mono font-black text-lg ${timerClass || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                <Clock size={18} />
                {formatTime(timeLeft)}
              </div>
              <button onClick={handleSubmit} className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:shadow-lg transition-all btn-ripple">
                Submit
              </button>
            </div>
          </div>
          <div className="mt-2">
            <div className={`h-1.5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <div className="progress-bar h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className={`flex justify-between text-[10px] mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <span>{answered} answered</span>
              <span>{skippedCount} remaining</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question area */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`rounded-2xl border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {currentQuestion.subject && (
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{currentQuestion.subject}</span>
                  )}
                  {currentQuestion.difficulty && (
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {currentQuestion.difficulty}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const qs = [...bookmarkedQs];
                      const idx = qs.indexOf(currentQ);
                      if (idx > -1) qs.splice(idx, 1); else qs.push(currentQ);
                      setBookmarkedQs(qs);
                    }}
                    className={`p-2 rounded-xl transition-all ${bookmarkedQs.includes(currentQ) ? 'bg-yellow-100 text-yellow-600' : isDarkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <Bookmark size={16} fill={bookmarkedQs.includes(currentQ) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => {
                      const qs = [...flaggedQs];
                      const idx = qs.indexOf(currentQ);
                      if (idx > -1) qs.splice(idx, 1); else qs.push(currentQ);
                      setFlaggedQs(qs);
                    }}
                    className={`p-2 rounded-xl transition-all ${flaggedQs.includes(currentQ) ? 'bg-red-100 text-red-600' : isDarkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <Flag size={16} fill={flaggedQs.includes(currentQ) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <p className={`text-base font-semibold leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <span className="text-blue-500 font-bold mr-2">Q{currentQ + 1}.</span>
                  {currentQuestion.question}
                </p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option: string, i: number) => {
                  const isAnswered = answers[currentQ] !== null;
                  const isCorrectOption = i === currentQuestion.correct;
                  const isSelected = answers[currentQ] === i;

                  let optionClass = '';
                  if (isAnswered && showExplanation) {
                    if (isCorrectOption) optionClass = 'correct';
                    else if (isSelected && !isCorrectOption) optionClass = 'incorrect';
                  } else if (isSelected) {
                    optionClass = 'selected';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      disabled={isAnswered}
                      className={`quiz-option w-full text-left p-4 rounded-xl border-2 flex items-center gap-3 ${optionClass || (isDarkMode ? 'border-slate-700 bg-slate-700 text-gray-200 hover:border-blue-500' : 'border-gray-100 bg-gray-50 text-gray-800 hover:border-blue-300 hover:bg-blue-50')} disabled:cursor-default`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${optionClass === 'correct' ? 'bg-white/30' : optionClass === 'incorrect' ? 'bg-white/30' : optionClass === 'selected' ? 'bg-white/30' : isDarkMode ? 'bg-slate-600 text-gray-400' : 'bg-white text-gray-500 border border-gray-200'}`}>
                        {optionClass === 'correct' ? '✓' : optionClass === 'incorrect' ? '✗' : String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm">{option}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && answers[currentQ] !== null && (
                <div className={`mt-4 p-4 rounded-xl border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-blue-50 border-blue-100'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                    💡 <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-6 gap-3">
                <button onClick={handlePrev} disabled={currentQ === 0} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all disabled:opacity-40 ${isDarkMode ? 'border-slate-700 text-gray-300 hover:bg-slate-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <ChevronLeft size={16} /> Previous
                </button>
                <button onClick={() => { if (currentQ < totalQ - 1) handleNext(); }} disabled={currentQ === totalQ - 1} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border text-orange-600 border-orange-200 hover:bg-orange-50 disabled:opacity-40 transition-all">
                  Skip <SkipForward size={16} />
                </button>
                <button
                  onClick={currentQ === totalQ - 1 ? handleSubmit : handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all btn-ripple"
                >
                  {currentQ === totalQ - 1 ? 'Submit' : 'Next'} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Question navigation panel */}
          <div className="space-y-4">
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg sticky top-32`}>
              <h3 className={`font-bold text-sm mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📋 Question Panel</h3>
              <div className="grid grid-cols-3 gap-2 mb-4 text-[10px]">
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-green-500" /><span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Correct</span></div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-red-400" /><span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Wrong</span></div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-gray-300" /><span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Skipped</span></div>
              </div>
              <div className="grid grid-cols-5 gap-1.5 mb-4">
                {questions.map((_q: QuizQuestion, qi: number) => {
                  const ua = answers[qi];
                  const isCorrect = ua === questions[qi].correct;
                  const isBookmarked = bookmarkedQs.includes(qi);
                  const isFlagged = flaggedQs.includes(qi);
                  let btnClass = isDarkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-500';
                  if (ua !== null) btnClass = isCorrect ? 'bg-green-500 text-white' : 'bg-red-400 text-white';
                  if (qi === currentQ) btnClass = 'bg-blue-600 text-white ring-2 ring-blue-300';
                  return (
                    <button key={qi} onClick={() => navigateToQuestion(qi)} className={`relative w-full aspect-square rounded-lg text-xs font-bold transition-all hover:scale-110 ${btnClass}`}>
                      {qi + 1}
                      {isBookmarked && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full" />}
                      {isFlagged && <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-red-600 rounded-full" />}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Answered', val: answered, color: 'text-green-500' },
                  { label: 'Bookmarked', val: bookmarkedQs.length, color: 'text-yellow-500' },
                  { label: 'Flagged', val: flaggedQs.length, color: 'text-red-500' },
                  { label: 'Remaining', val: totalQ - answered, color: 'text-gray-500' },
                ].map(item => (
                  <div key={item.label} className={`flex justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.val}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit} className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-xl text-sm hover:shadow-lg transition-all btn-ripple">
                🏁 Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
