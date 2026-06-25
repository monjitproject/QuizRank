import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { leaderboardData } from '../data/quizData';
import { Trophy, ArrowRight } from 'lucide-react';

export default function LeaderboardSection() {
  const { setCurrentPage, isDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const data = leaderboardData[activeTab];

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-yellow-100">
                  🏆 Top Performers
                </div>
                <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
                  Leaderboard
                </h2>
              </div>
              <div className={`flex gap-1 p-1 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'weekly' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setActiveTab('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'monthly' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Top 3 */}
            <div className="flex justify-center gap-4 mb-6">
              {/* Rank 2 */}
              <div className="text-center pt-6 flex-1">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-2xl shadow-lg border-2 border-white">
                    {data[1].avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full rank-2 flex items-center justify-center text-white text-sm font-black shadow">2</div>
                </div>
                <div className={`mt-3 font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data[1].name.split(' ')[0]}</div>
                <div className="text-blue-600 font-black text-lg">{data[1].score.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">{data[1].accuracy}% accuracy</div>
              </div>
              {/* Rank 1 */}
              <div className="text-center flex-1 -mt-4">
                <div className="text-2xl mb-1 animate-bounce">👑</div>
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-xl border-4 border-yellow-300">
                    {data[0].avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full rank-1 flex items-center justify-center text-white text-sm font-black shadow">1</div>
                </div>
                <div className={`mt-3 font-bold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data[0].name.split(' ')[0]}</div>
                <div className="text-yellow-500 font-black text-xl">{data[0].score.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">{data[0].accuracy}% accuracy</div>
              </div>
              {/* Rank 3 */}
              <div className="text-center pt-8 flex-1">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-2xl shadow-lg border-2 border-white">
                    {data[2].avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full rank-3 flex items-center justify-center text-white text-sm font-black shadow">3</div>
                </div>
                <div className={`mt-3 font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data[2].name.split(' ')[0]}</div>
                <div className="text-orange-600 font-black text-lg">{data[2].score.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">{data[2].accuracy}% accuracy</div>
              </div>
            </div>

            {/* Rest of leaderboard */}
            <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} shadow-lg`}>
              <div className={`px-4 py-2 text-xs font-bold grid grid-cols-12 gap-2 ${isDarkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                <span className="col-span-1">#</span>
                <span className="col-span-5">Student</span>
                <span className="col-span-2 text-right">Score</span>
                <span className="col-span-2 text-right">Accuracy</span>
                <span className="col-span-2 text-right">Quizzes</span>
              </div>
              {data.slice(3).map((entry) => (
                <div
                  key={entry.rank}
                  className={`px-4 py-3 grid grid-cols-12 gap-2 items-center border-b last:border-0 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors ${isDarkMode ? 'border-slate-700' : 'border-gray-50'}`}
                >
                  <span className={`col-span-1 font-bold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{entry.rank}</span>
                  <div className="col-span-5 flex items-center gap-2">
                    <span className="text-base">{entry.avatar}</span>
                    <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{entry.name}</span>
                  </div>
                  <span className="col-span-2 text-right font-bold text-sm text-blue-600">{entry.score.toLocaleString()}</span>
                  <span className="col-span-2 text-right text-xs text-green-500 font-medium">{entry.accuracy}%</span>
                  <span className={`col-span-2 text-right text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{entry.quizzes}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button onClick={() => setCurrentPage('leaderboard')} className="flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm mx-auto">
                View Full Leaderboard <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right - Join + Achievements */}
          <div className="lg:col-span-2 space-y-5">
            <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-100'}`}>
              <div className="text-3xl mb-3">🏆</div>
              <h3 className={`text-lg font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Want to Top the Board?</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Practice daily quizzes, attempt mock tests, and climb to the top of the All India leaderboard!
              </p>
              <div className="space-y-2 mb-5">
                {['Complete daily quiz streaks', 'Score 90%+ in mock tests', 'Attempt exams on time', 'Refer friends to earn bonus points'].map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{tip}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('quiz')} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all text-sm btn-ripple">
                🚀 Start Competing Now
              </button>
            </div>

            {/* Achievements */}
            <div className={`rounded-2xl p-5 border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100'} shadow-lg`}>
              <h4 className={`font-bold text-sm mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Trophy size={16} className="text-yellow-500" /> Achievement Badges
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: '🔥', label: '7 Day Streak', color: 'bg-orange-100' },
                  { icon: '⭐', label: '100 Quizzes', color: 'bg-yellow-100' },
                  { icon: '🎯', label: '90%+ Accuracy', color: 'bg-blue-100' },
                  { icon: '🏆', label: 'Top 10', color: 'bg-purple-100' },
                  { icon: '📚', label: 'All Subjects', color: 'bg-green-100' },
                  { icon: '⚡', label: 'Speed King', color: 'bg-red-100' },
                  { icon: '🌟', label: 'Perfect Score', color: 'bg-indigo-100' },
                  { icon: '👑', label: 'Champion', color: 'bg-amber-100' },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-xl ${badge.color} flex items-center justify-center text-xl mb-1 badge-glow`}>
                      {badge.icon}
                    </div>
                    <span className={`text-[10px] leading-tight ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
