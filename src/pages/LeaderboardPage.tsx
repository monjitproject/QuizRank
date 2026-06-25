import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { leaderboardData } from '../data/quizData';
import { Medal, TrendingUp } from 'lucide-react';

export default function LeaderboardPage() {
  const { isDarkMode, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');
  const [activeExam, setActiveExam] = useState('All Exams');

  const data = leaderboardData[activeTab];
  const exams = ['All Exams', 'SSC', 'Railway', 'Banking', 'UPSC', 'Police'];

  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl p-8 text-white text-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="text-5xl mb-3">🏆</div>
            <h1 className="text-3xl font-black mb-2">All India Leaderboard</h1>
            <p className="text-yellow-100">Compete with students across India. Rank based on quiz performance.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 p-1 rounded-2xl mb-6 w-fit mx-auto ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow'}`}>
          {['weekly', 'monthly'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'weekly' | 'monthly')}
              className={`px-8 py-3 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {tab === 'weekly' ? '📅 Weekly' : '📆 Monthly'}
            </button>
          ))}
        </div>

        {/* Exam filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {exams.map(exam => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeExam === exam ? 'bg-blue-600 text-white' : isDarkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              {exam}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className={`rounded-3xl p-8 mb-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100'} shadow-xl`}>
          <h2 className={`text-center font-black text-lg mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>🎖️ Top Performers</h2>
          <div className="flex justify-center items-end gap-6">
            {/* 2nd place */}
            <div className="text-center">
              <div className="text-4xl mb-2">{data[1].avatar}</div>
              <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data[1].name}</div>
              <div className="text-sm text-gray-500 mb-2">{data[1].score.toLocaleString()} pts</div>
              <div className="w-24 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-xl h-20 flex items-center justify-center">
                <span className="text-white font-black text-2xl">2</span>
              </div>
            </div>
            {/* 1st place */}
            <div className="text-center">
              <div className="text-2xl mb-1">👑</div>
              <div className="text-4xl mb-2">{data[0].avatar}</div>
              <div className={`font-black text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data[0].name}</div>
              <div className="text-yellow-500 font-bold mb-2">{data[0].score.toLocaleString()} pts</div>
              <div className="w-24 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-xl h-28 flex items-center justify-center">
                <span className="text-white font-black text-2xl">1</span>
              </div>
            </div>
            {/* 3rd place */}
            <div className="text-center">
              <div className="text-4xl mb-2">{data[2].avatar}</div>
              <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data[2].name}</div>
              <div className="text-sm text-gray-500 mb-2">{data[2].score.toLocaleString()} pts</div>
              <div className="w-24 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-xl h-14 flex items-center justify-center">
                <span className="text-white font-black text-2xl">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full rankings */}
        <div className={`rounded-2xl border overflow-hidden shadow-lg ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
          <div className={`px-6 py-3 grid grid-cols-12 gap-2 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
            <span className="col-span-1">Rank</span>
            <span className="col-span-4">Student</span>
            <span className="col-span-2 text-right">Score</span>
            <span className="col-span-2 text-right">Accuracy</span>
            <span className="col-span-2 text-right">Quizzes</span>
            <span className="col-span-1 text-right">Badge</span>
          </div>

          {data.map((entry, i) => (
            <div
              key={i}
              className={`px-6 py-4 grid grid-cols-12 gap-2 items-center border-b last:border-0 transition-colors hover:bg-blue-50 dark:hover:bg-slate-700 ${isDarkMode ? 'border-slate-700' : 'border-gray-50'} ${i < 3 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent' : ''}`}
            >
              <div className="col-span-1">
                {i === 0 ? <Medal size={20} className="text-yellow-500" /> :
                  i === 1 ? <Medal size={20} className="text-gray-400" /> :
                    i === 2 ? <Medal size={20} className="text-orange-500" /> :
                      <span className={`font-bold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i + 1}</span>}
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <span className="text-2xl">{entry.avatar}</span>
                <div>
                  <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{entry.name}</div>
                </div>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-black text-blue-600">{entry.score.toLocaleString()}</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-green-500 font-semibold text-sm">{entry.accuracy}%</span>
              </div>
              <div className="col-span-2 text-right">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{entry.quizzes}</span>
              </div>
              <div className="col-span-1 text-right">
                <span>{entry.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
            <TrendingUp size={32} className="text-blue-600 mx-auto mb-3" />
            <h3 className={`font-black text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Want to Climb Higher?</h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Practice more quizzes and improve your rank</p>
            <button onClick={() => setCurrentPage('quiz')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg transition-all btn-ripple">
              Start Practicing Now 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
