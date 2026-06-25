import { useApp } from '../context/AppContext';
import { topExams } from '../data/quizData';
import { ArrowRight, Calendar, Briefcase } from 'lucide-react';

export default function TopExamsSection() {
  const { setCurrentPage, isDarkMode } = useApp();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-red-100">
            🏆 Top Govt Exams 2025
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
            Most Popular{' '}
            <span className="gradient-text">Government Exams</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Latest exam notifications with closing dates. Start preparation now!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topExams.map((exam, i) => (
            <div
              key={i}
              className={`group rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl card-hover ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}
            >
              {/* Header gradient */}
              <div className={`bg-gradient-to-br ${exam.color} p-5 relative overflow-hidden`}>
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-3xl mb-2">{exam.icon}</div>
                    <h3 className="text-white font-black text-lg">{exam.name}</h3>
                    <span className="text-white/80 text-xs">{exam.category} Exam</span>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-lg mb-1">
                      {exam.level}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="space-y-3 mb-5">
                  <div className={`flex justify-between items-center py-2 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-50'}`}>
                    <span className={`text-xs flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Briefcase size={12} /> Vacancies
                    </span>
                    <span className="font-bold text-sm text-blue-600">{exam.posts}</span>
                  </div>
                  <div className={`flex justify-between items-center py-2 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-50'}`}>
                    <span className={`text-xs flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Calendar size={12} /> Last Date
                    </span>
                    <span className="font-bold text-sm text-red-500">{exam.lastDate}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage('quiz')}
                    className={`flex-1 bg-gradient-to-r ${exam.color} text-white font-semibold py-2.5 rounded-xl text-xs hover:shadow-lg transition-all btn-ripple`}
                  >
                    Practice Quiz
                  </button>
                  <button
                    onClick={() => setCurrentPage('blog')}
                    className={`flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Info <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }} />
          <div className="relative">
            <h3 className="text-2xl font-black mb-2">🎯 Start Your Exam Preparation Today!</h3>
            <p className="text-blue-100 mb-6">2.5M+ students are already practicing daily. Join them now.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setCurrentPage('quiz')} className="bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                🚀 Start Free Quiz
              </button>
              <button onClick={() => setCurrentPage('mock-tests')} className="bg-white/20 border border-white/30 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/30 transition-all text-sm">
                📋 Free Mock Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
