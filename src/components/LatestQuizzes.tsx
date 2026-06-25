import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { latestQuizzes } from '../data/quizData';
import { Clock, Users, Star, Bookmark, Play, ArrowRight, Filter } from 'lucide-react';

export default function LatestQuizzes() {
  const { setCurrentPage, isDarkMode, bookmarks, toggleBookmark, setCurrentQuiz } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayCount, setDisplayCount] = useState(8);

  const filters = ['All', 'SSC', 'Railway', 'Banking', 'Police', 'Defence', 'Teaching'];

  const filtered = activeFilter === 'All'
    ? latestQuizzes
    : latestQuizzes.filter(q => q.category === activeFilter);

  const displayed = filtered.slice(0, displayCount);

  const getDifficultyColor = (d: string) => {
    if (d === 'Easy') return 'bg-green-100 text-green-700';
    if (d === 'Medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-orange-100">
              🔥 Latest Quizzes
            </div>
            <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
              Latest Govt Job{' '}
              <span className="gradient-text">Quizzes 2025</span>
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Practice with latest exam-pattern questions
            </p>
          </div>
          <button onClick={() => setCurrentPage('quiz-category')} className="flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm">
            View All Quizzes <ArrowRight size={16} />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="flex items-center gap-1 text-gray-500 text-sm mr-1">
            <Filter size={14} /> Filter:
          </span>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => { setActiveFilter(f); setDisplayCount(8); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === f ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Quiz cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayed.map((quiz, index) => (
            <div
              key={quiz.id}
              className={`quiz-card rounded-2xl overflow-hidden border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100'} shadow-md cursor-pointer group`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${quiz.color} p-5 relative overflow-hidden`}>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-2">
                    {quiz.isNew && (
                      <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                    )}
                    {quiz.isHot && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">🔥 HOT</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(quiz.id.toString()); }}
                    className="bg-white/20 hover:bg-white/40 p-1.5 rounded-lg transition-colors"
                  >
                    <Bookmark
                      size={14}
                      className="text-white"
                      fill={bookmarks.includes(quiz.id.toString()) ? 'white' : 'none'}
                    />
                  </button>
                </div>
                <div className="text-3xl mb-1">{quiz.icon}</div>
                <div className="text-white font-bold text-sm leading-tight">{quiz.category}</div>

                {/* Decorative circle */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/5 rounded-full" />
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className={`font-bold text-sm mb-3 leading-tight group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {quiz.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-lg flex items-center gap-1 ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty === 'Easy' ? '🟢' : quiz.difficulty === 'Medium' ? '🟡' : '🔴'} {quiz.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-lg flex items-center gap-1 ${isDarkMode ? 'bg-slate-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    <Clock size={10} /> {quiz.time} min
                  </span>
                </div>

                <div className={`flex justify-between text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="flex items-center gap-1">
                    <BookIcon /> {quiz.questions} Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {(quiz.attempts / 1000).toFixed(0)}K Attempts
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={11} className={s <= Math.floor(quiz.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{quiz.rating}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setCurrentQuiz(quiz); setCurrentPage('quiz'); }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm btn-ripple"
                >
                  <Play size={14} fill="white" /> Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {displayCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setDisplayCount(prev => prev + 8)}
              className={`inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-2xl border-2 transition-all duration-200 ${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}
            >
              Load More Quizzes <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function BookIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
