import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { subjects } from '../data/quizData';
import { Play, ChevronRight } from 'lucide-react';

export default function SubjectQuizSection() {
  const { setCurrentPage, setCurrentQuiz, isDarkMode } = useApp();
  const [activeSubject, setActiveSubject] = useState(subjects[0]);

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-purple-100">
            📖 Subject-Wise Practice
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
            Subject Wise{' '}
            <span className="gradient-text">Quiz Practice</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Topic-wise quizzes in Hindi & English. Master every subject with focused practice.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subject selector */}
          <div className={`rounded-2xl overflow-hidden border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
            <div className="p-4 border-b border-gray-100">
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Choose Subject</h3>
            </div>
            <div className="p-2">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => setActiveSubject(subject)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 mb-1 ${activeSubject.id === subject.id
                    ? `bg-gradient-to-r ${subject.color} text-white shadow-md`
                    : isDarkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{subject.icon}</span>
                  <div>
                    <div className="font-semibold text-sm">{subject.name}</div>
                    <div className={`text-xs ${activeSubject.id === subject.id ? 'text-white/80' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {subject.topics.length} topics • {subject.questions.length} sample questions
                    </div>
                  </div>
                  {activeSubject.id === subject.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          {/* Topics + Questions preview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Subject header */}
            <div className={`rounded-2xl bg-gradient-to-br ${activeSubject.color} p-6 text-white relative overflow-hidden`}>
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
              <div className="relative">
                <div className="text-4xl mb-2">{activeSubject.icon}</div>
                <h3 className="text-xl font-black mb-1" style={{ fontFamily: 'Poppins' }}>{activeSubject.name} Quiz</h3>
                <p className="text-white/80 text-sm mb-4">
                  {activeSubject.lang === 'hi' ? 'प्रश्न और उत्तर हिंदी में' : 'Questions & Answers in English'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeSubject.topics.map(topic => (
                    <span key={topic} className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample questions */}
            <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Sample Questions — {activeSubject.name}
                </h4>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activeSubject.questions.length} preview questions</span>
              </div>
              <div className="divide-y divide-gray-50">
                {activeSubject.questions.slice(0, 3).map((q, i) => (
                  <div key={q.id} className={`p-4 hover:bg-gray-50 transition-colors ${isDarkMode ? 'hover:bg-slate-700' : ''}`}>
                    <div className="flex gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gradient-to-br ${activeSubject.color} text-white`}>
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{q.question}</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className={`text-xs px-2.5 py-1.5 rounded-lg border ${oi === q.correct ? 'bg-green-50 border-green-200 text-green-700 font-medium' : isDarkMode ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                              <span className="font-bold">{String.fromCharCode(65 + oi)}.</span> {opt}
                              {oi === q.correct && <span className="ml-1">✓</span>}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {q.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => { setCurrentQuiz({ subject: activeSubject, questions: activeSubject.questions, title: `${activeSubject.name} Quiz` }); setCurrentPage('quiz'); }}
                  className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${activeSubject.color} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all btn-ripple`}
                >
                  <Play size={16} fill="white" />
                  Start Full {activeSubject.name} Quiz — All {activeSubject.questions.length}+ Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
