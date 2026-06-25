import { useApp } from '../context/AppContext';
import { currentAffairsQuizzes } from '../data/quizData';
import { Clock, Users, Calendar, ArrowRight, Zap } from 'lucide-react';

const topics = [
  { icon: '🇮🇳', label: 'India', color: 'from-orange-400 to-red-500', count: 45 },
  { icon: '🌍', label: 'World', color: 'from-blue-400 to-cyan-500', count: 32 },
  { icon: '⚽', label: 'Sports', color: 'from-green-400 to-teal-500', count: 28 },
  { icon: '💰', label: 'Economy', color: 'from-yellow-400 to-orange-500', count: 24 },
  { icon: '🔬', label: 'Science', color: 'from-purple-400 to-pink-500', count: 19 },
  { icon: '💻', label: 'Technology', color: 'from-indigo-400 to-blue-500', count: 21 },
  { icon: '🏛️', label: 'Govt Schemes', color: 'from-red-400 to-pink-500', count: 35 },
];

export default function CurrentAffairsSection() {
  const { setCurrentPage, isDarkMode } = useApp();
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Daily CA Quiz */}
          <div className="lg:w-2/3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-green-100">
                  <Zap size={12} /> Auto-Updated Daily
                </div>
                <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
                  Daily Current Affairs{' '}
                  <span className="gradient-text">Quiz</span>
                </h2>
                <p className={`text-sm mt-1 flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Calendar size={13} /> {today}
                </p>
              </div>
              <button onClick={() => setCurrentPage('current-affairs')} className="flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm whitespace-nowrap">
                View All <ArrowRight size={16} />
              </button>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-6">
              {topics.map(topic => (
                <button
                  key={topic.label}
                  onClick={() => setCurrentPage('current-affairs')}
                  className={`flex items-center gap-2 bg-gradient-to-r ${topic.color} text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                >
                  <span>{topic.icon}</span>
                  {topic.label}
                  <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[10px]">{topic.count}</span>
                </button>
              ))}
            </div>

            {/* Quiz list */}
            <div className="space-y-3">
              {currentAffairsQuizzes.map((quiz, i) => (
                <div
                  key={quiz.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer group ${i === 0 ? 'border-blue-200 bg-blue-50' : isDarkMode ? 'border-slate-700 bg-slate-700 hover:bg-slate-600' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                  onClick={() => setCurrentPage('quiz')}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${i === 0 ? 'bg-blue-100' : isDarkMode ? 'bg-slate-600' : 'bg-gray-100'}`}>
                    {i === 0 ? '📅' : i === 1 ? '🌍' : i === 2 ? '⚽' : i === 3 ? '💰' : i === 4 ? '🔬' : '🏛️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {i === 0 && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">TODAY</span>}
                      <h3 className={`font-semibold text-sm truncate group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{quiz.title}</h3>
                    </div>
                    <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="flex items-center gap-1"><Clock size={10} /> {quiz.time} min</span>
                      <span>•</span>
                      <span>{quiz.questions} Questions</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {(quiz.attempts / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:shadow-md transition-all whitespace-nowrap">
                    Start Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Today's Highlights */}
          <div className="lg:w-1/3 space-y-4">
            {/* Today's quiz highlight */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />
              <div className="relative">
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="text-lg font-black mb-2">Today's Hot Quiz</h3>
                <p className="text-blue-100 text-sm mb-4">India Current Affairs — January 2025</p>
                <div className="flex gap-3 text-xs text-blue-100 mb-4">
                  <span>25 Questions</span>
                  <span>•</span>
                  <span>30 Minutes</span>
                </div>
                <button onClick={() => setCurrentPage('quiz')} className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                  Start Today's Quiz →
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100'} shadow-lg`}>
              <h4 className={`font-bold text-sm mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📊 Today's Statistics</h4>
              <div className="space-y-3">
                {[
                  { label: 'Quizzes Completed Today', value: '12,450+', icon: '✅' },
                  { label: 'New Questions Added', value: '250+', icon: '➕' },
                  { label: 'Active Users Right Now', value: '8,923', icon: '👥' },
                  { label: 'Topics Covered', value: '7 Topics', icon: '📚' },
                ].map(item => (
                  <div key={item.label} className={`flex justify-between items-center py-2 border-b last:border-0 ${isDarkMode ? 'border-slate-600' : 'border-gray-50'}`}>
                    <span className={`text-xs flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>{item.icon}</span> {item.label}
                    </span>
                    <span className="text-blue-600 font-bold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe alert */}
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-100'}`}>
              <div className="text-2xl mb-2">🔔</div>
              <h4 className={`font-bold text-sm mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get Daily Quiz Alert</h4>
              <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Never miss a daily quiz. Get notified every morning.</p>
              <input type="email" placeholder="your@email.com" className={`w-full px-3 py-2 rounded-xl border text-xs mb-2 ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-orange-200 bg-white'}`} />
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold py-2.5 rounded-xl hover:shadow-lg transition-all">
                Subscribe Free 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
