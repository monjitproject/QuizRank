import { useApp } from '../context/AppContext';
import { BookOpen, Target, TrendingUp, Star, Award, Clock, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user, isDarkMode, setCurrentPage, quizResults } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold mb-2">Please Login First</h2>
          <p className="text-gray-500 mb-4">Login to access your dashboard</p>
          <button onClick={() => setCurrentPage('home')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const totalCorrect = quizResults.reduce((acc, r) => acc + r.correct, 0);
  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / quizResults.length)
    : 0;

  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-4 bottom-0 w-24 h-24 bg-white/5 rounded-full" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl border border-white/30">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-black">{user.name}</h1>
              <p className="text-blue-100">{user.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.badges.map((b, i) => (
                  <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm">{b}</span>
                ))}
              </div>
            </div>
            <div className="sm:ml-auto text-right">
              <div className="text-3xl font-black">#{user.rank}</div>
              <div className="text-blue-200 text-sm">All India Rank</div>
              <div className="text-sm mt-1">Member since {user.joinDate}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <BookOpen size={22} />, label: 'Quizzes Attempted', value: user.quizzesAttempted + quizResults.length, color: 'from-blue-500 to-indigo-600' },
            { icon: <Target size={22} />, label: 'Total Score', value: user.totalScore.toLocaleString(), color: 'from-green-500 to-teal-600' },
            { icon: <CheckCircle size={22} />, label: 'Correct Answers', value: totalCorrect || '—', color: 'from-purple-500 to-pink-600' },
            { icon: <TrendingUp size={22} />, label: 'Avg. Score', value: avgScore ? `${avgScore}%` : '—', color: 'from-orange-500 to-red-600' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl p-5 bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
              <div className="mb-3 opacity-90">{stat.icon}</div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-white/80 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quiz history */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg overflow-hidden`}>
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className={`font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Clock size={16} className="text-blue-500" /> Recent Quiz History
                </h3>
              </div>

              {quizResults.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No quizzes attempted yet</p>
                  <button onClick={() => setCurrentPage('quiz')} className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                    Start Your First Quiz
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {quizResults.slice(0, 8).map((result, i) => {
                    const pct = Math.round((result.score / result.total) * 100);
                    return (
                      <div key={i} className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${isDarkMode ? 'hover:bg-slate-700' : ''}`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${pct >= 80 ? 'bg-green-100' : pct >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                          {pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '📚'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{result.title}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {result.correct}✓ {result.incorrect}✗ {result.skipped}—
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`font-black text-lg ${pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{pct}%</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{result.date.split('T')[0]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Badges */}
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <h3 className={`font-bold text-sm mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Award size={16} className="text-yellow-500" /> My Achievements
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {['🔥', '⭐', '🎯', '🏆', '📚', '⚡', '🌟', '👑'].map((badge, i) => (
                  <div key={i} className={`flex flex-col items-center p-2 rounded-xl ${i < user.badges.length ? 'bg-yellow-50' : isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <span className={`text-2xl ${i >= user.badges.length ? 'opacity-30 grayscale' : ''}`}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <h3 className={`font-bold text-sm mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Star size={16} className="text-blue-500" /> Subject Performance
              </h3>
              {[
                { sub: 'Reasoning', score: 78, color: 'bg-blue-500' },
                { sub: 'Maths', score: 65, color: 'bg-purple-500' },
                { sub: 'English', score: 85, color: 'bg-green-500' },
                { sub: 'GK', score: 72, color: 'bg-orange-500' },
              ].map(s => (
                <div key={s.sub} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{s.sub}</span>
                    <span className="font-bold text-blue-600">{s.score}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <h3 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: '🚀', label: 'Start Quiz', page: 'quiz' },
                  { icon: '📋', label: 'Mock Test', page: 'mock-tests' },
                  { icon: '🏆', label: 'Leaderboard', page: 'leaderboard' },
                  { icon: '📰', label: 'Current Affairs', page: 'current-affairs' },
                ].map(a => (
                  <button key={a.label} onClick={() => setCurrentPage(a.page)} className={`w-full text-left flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${isDarkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <span>{a.icon}</span> {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
