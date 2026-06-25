import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Star, ChevronRight, Filter } from 'lucide-react';

const mockTests = [
  { id: 1, title: 'SSC GD Constable Full Mock Test 2024', category: 'SSC', questions: 80, time: 60, attempts: 234567, rating: 4.9, difficulty: 'Medium', freeQuestions: 20, isPremium: false, icon: '🏛️', color: 'from-purple-500 to-indigo-600' },
  { id: 2, title: 'SSC CGL Tier I Complete Mock Test', category: 'SSC', questions: 100, time: 60, attempts: 189234, rating: 4.8, difficulty: 'Hard', freeQuestions: 25, isPremium: false, icon: '📋', color: 'from-blue-500 to-purple-600' },
  { id: 3, title: 'RRB NTPC CBT 1 Full Mock Test', category: 'Railway', questions: 100, time: 90, attempts: 312456, rating: 4.9, difficulty: 'Medium', freeQuestions: 25, isPremium: false, icon: '🚂', color: 'from-cyan-500 to-blue-600' },
  { id: 4, title: 'IBPS PO Prelims Mock Test 2024', category: 'Banking', questions: 100, time: 60, attempts: 156789, rating: 4.7, difficulty: 'Hard', freeQuestions: 20, isPremium: false, icon: '🏦', color: 'from-green-500 to-teal-600' },
  { id: 5, title: 'UPSC Prelims GS Paper I Mock', category: 'UPSC', questions: 100, time: 120, attempts: 89034, rating: 4.8, difficulty: 'Hard', freeQuestions: 15, isPremium: false, icon: '⚖️', color: 'from-red-500 to-pink-600' },
  { id: 6, title: 'UP Police Constable Full Mock', category: 'Police', questions: 150, time: 120, attempts: 456789, rating: 4.9, difficulty: 'Medium', freeQuestions: 30, isPremium: false, icon: '👮', color: 'from-blue-600 to-indigo-700' },
  { id: 7, title: 'CTET Paper I Complete Mock Test', category: 'Teaching', questions: 150, time: 150, attempts: 123456, rating: 4.7, difficulty: 'Medium', freeQuestions: 30, isPremium: false, icon: '📚', color: 'from-pink-500 to-rose-600' },
  { id: 8, title: 'Army Agniveer Soldier GD Mock Test', category: 'Defence', questions: 50, time: 60, attempts: 567890, rating: 4.9, difficulty: 'Easy', freeQuestions: 15, isPremium: false, icon: '🎖️', color: 'from-amber-500 to-orange-600' },
  { id: 9, title: 'SBI Clerk Prelims Mock Test 2024', category: 'Banking', questions: 100, time: 60, attempts: 198034, rating: 4.8, difficulty: 'Medium', freeQuestions: 20, isPremium: false, icon: '💳', color: 'from-emerald-500 to-green-600' },
  { id: 10, title: 'NDA Mathematics Full Paper', category: 'Defence', questions: 120, time: 150, attempts: 45678, rating: 4.7, difficulty: 'Hard', freeQuestions: 20, isPremium: false, icon: '✈️', color: 'from-orange-500 to-red-600' },
  { id: 11, title: 'RRB Group D Full Mock Test', category: 'Railway', questions: 100, time: 90, attempts: 389012, rating: 4.8, difficulty: 'Easy', freeQuestions: 25, isPremium: false, icon: '🔧', color: 'from-teal-500 to-cyan-600' },
  { id: 12, title: 'UPTET Paper II Science Mock', category: 'Teaching', questions: 150, time: 150, attempts: 67234, rating: 4.6, difficulty: 'Medium', freeQuestions: 30, isPremium: false, icon: '🔬', color: 'from-violet-500 to-purple-600' },
];

export default function MockTestsPage() {
  const { isDarkMode, setCurrentPage, setCurrentQuiz } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const filters = ['All', 'SSC', 'Railway', 'Banking', 'UPSC', 'Police', 'Teaching', 'Defence'];

  const filtered = (activeFilter === 'All' ? mockTests : mockTests.filter(t => t.category === activeFilter))
    .sort((a, b) => sortBy === 'popular' ? b.attempts - a.attempts : b.rating - a.rating);

  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 mb-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
          <div className="relative">
            <div className="text-4xl mb-3">📋</div>
            <h1 className="text-3xl font-black mb-2">Free Mock Tests 2025</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">Practice with full-length mock tests based on latest exam patterns. Detailed analysis and rank prediction included.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            <span className="flex items-center gap-1 text-gray-500 text-sm"><Filter size={14} /> Category:</span>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeFilter === f ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : isDarkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-xl text-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Mock test grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(test => (
            <div
              key={test.id}
              className={`rounded-2xl border overflow-hidden shadow-md hover:shadow-xl card-hover ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}
            >
              <div className={`bg-gradient-to-br ${test.color} p-5 relative overflow-hidden`}>
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full" />
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl">{test.icon}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${test.difficulty === 'Easy' ? 'bg-green-500/80' : test.difficulty === 'Medium' ? 'bg-yellow-500/80' : 'bg-red-500/80'} text-white`}>
                    {test.difficulty}
                  </span>
                </div>
                <div className="text-white/80 text-xs font-medium">{test.category}</div>
                <h3 className="text-white font-bold text-sm mt-1 leading-tight">{test.title}</h3>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className={`rounded-xl p-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{test.questions}</div>
                    <div className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Questions</div>
                  </div>
                  <div className={`rounded-xl p-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{test.time}m</div>
                    <div className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Duration</div>
                  </div>
                  <div className={`rounded-xl p-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{(test.attempts / 1000).toFixed(0)}K</div>
                    <div className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Attempts</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= Math.floor(test.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{test.rating} • <span className="text-green-600 font-medium">FREE</span></span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setCurrentQuiz(test); setCurrentPage('quiz'); }}
                    className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${test.color} text-white font-bold py-2.5 rounded-xl text-sm hover:shadow-lg transition-all btn-ripple`}
                  >
                    <Play size={14} fill="white" /> Start Test
                  </button>
                  <button className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
