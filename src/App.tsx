import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import LatestQuizzes from './components/LatestQuizzes';
import SubjectQuizSection from './components/SubjectQuizSection';
import CurrentAffairsSection from './components/CurrentAffairsSection';
import TopExamsSection from './components/TopExamsSection';
import LeaderboardSection from './components/LeaderboardSection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogSection';
import QuizPage from './pages/QuizPage';
import MockTestsPage from './pages/MockTestsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import BlogPage from './pages/BlogPage';
import DashboardPage from './pages/DashboardPage';
import {
  AboutPage, ContactPage, PrivacyPage, TermsPage,
  DisclaimerPage, FAQPage, RegisterPage
} from './pages/StaticPages';

function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Ad banner placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-gray-100 rounded-xl h-16 flex items-center justify-center text-gray-400 text-xs border border-gray-200">
          📢 Advertisement — Google AdSense Banner (728×90)
        </div>
      </div>
      <CategorySection />
      <LatestQuizzes />
      <SubjectQuizSection />
      <CurrentAffairsSection />
      {/* Ad banner */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-gray-100 rounded-xl h-16 flex items-center justify-center text-gray-400 text-xs border border-gray-200">
          📢 Advertisement — Google AdSense Banner (728×90)
        </div>
      </div>
      <TopExamsSection />
      <LeaderboardSection />
      <TestimonialsSection />
      <BlogSection />
    </>
  );
}

function CurrentAffairsPage() {
  const { isDarkMode, setCurrentPage } = useApp();
  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white text-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
          <div className="relative">
            <div className="text-4xl mb-3">📰</div>
            <h1 className="text-3xl font-black mb-2">Daily Current Affairs Quiz</h1>
            <p className="text-orange-100">Auto-updated every day. Never miss today's important events.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {[
              { date: 'Today - Jan 15, 2025', title: 'India Current Affairs Quiz - January 15, 2025', questions: 25, time: 30, color: 'from-blue-600 to-indigo-700', isToday: true },
              { date: 'Jan 14, 2025', title: 'World Affairs Daily Quiz - January 14, 2025', questions: 20, time: 25, color: 'from-green-600 to-teal-700', isToday: false },
              { date: 'Jan 13, 2025', title: 'Sports News Quiz - January 13, 2025', questions: 15, time: 20, color: 'from-orange-500 to-red-600', isToday: false },
              { date: 'Jan 12, 2025', title: 'Economy & Finance Quiz - January 12, 2025', questions: 20, time: 25, color: 'from-purple-600 to-pink-600', isToday: false },
              { date: 'Jan 11, 2025', title: 'Science & Technology Quiz - January 11, 2025', questions: 20, time: 25, color: 'from-cyan-600 to-blue-600', isToday: false },
              { date: 'Jan 10, 2025', title: 'Government Schemes & Policies Quiz', questions: 25, time: 30, color: 'from-red-600 to-orange-600', isToday: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-5 p-5 rounded-2xl border cursor-pointer hover:shadow-lg transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  📅
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.isToday && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">TODAY</span>}
                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.date}</span>
                  </div>
                  <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.questions} Questions • {item.time} Minutes</div>
                </div>
                <button onClick={() => setCurrentPage('quiz')} className={`flex-shrink-0 bg-gradient-to-r ${item.color} text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:shadow-lg transition-all`}>
                  Start
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-5 text-white">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="font-black text-lg mb-2">Today's Hot Topics</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                {['Operation Sindoor', 'ISRO Mission Update', 'RBI Policy Rate', 'Cricket World Cup', 'Budget 2025 Highlights', 'PM Schemes 2025'].map(topic => (
                  <li key={topic} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-300 rounded-full flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <h4 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📱 Topic Filter</h4>
              <div className="flex flex-wrap gap-2">
                {['All', 'National', 'International', 'Sports', 'Economy', 'Science', 'Politics', 'Defence'].map(t => (
                  <button key={t} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${t === 'All' ? 'bg-blue-600 text-white border-transparent' : isDarkMode ? 'border-slate-600 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
                    {t}
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

function DailyQuizPage() {
  const { isDarkMode, setCurrentPage } = useApp();
  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl p-8 text-white text-center mb-8">
          <div className="text-4xl mb-3">📅</div>
          <h1 className="text-3xl font-black mb-2">Daily Quiz Challenge</h1>
          <p className="text-green-100">Complete today's quiz and earn your daily streak badge!</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { title: 'GK Daily Quiz', desc: '10 mixed GK questions', time: 10, icon: '🌍', color: 'from-blue-500 to-indigo-600', streak: 5 },
            { title: 'Reasoning Daily', desc: '10 reasoning puzzles', time: 10, icon: '🧠', color: 'from-purple-500 to-pink-600', streak: 3 },
            { title: 'Math Daily Quiz', desc: '10 aptitude questions', time: 15, icon: '🔢', color: 'from-orange-500 to-red-500', streak: 7 },
            { title: 'English Daily', desc: '10 grammar questions', time: 10, icon: '✍️', color: 'from-green-500 to-teal-600', streak: 2 },
          ].map((quiz, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <div className={`bg-gradient-to-br ${quiz.color} p-5`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-3xl mb-2">{quiz.icon}</div>
                    <h3 className="text-white font-black text-lg">{quiz.title}</h3>
                    <p className="text-white/80 text-xs">{quiz.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 px-2.5 py-1 rounded-lg text-white text-xs font-bold">{quiz.time} min</div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 text-xl">🔥</span>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{quiz.streak} day streak</span>
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today: Not attempted</span>
                </div>
                <button onClick={() => setCurrentPage('quiz')} className={`w-full bg-gradient-to-r ${quiz.color} text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all btn-ripple text-sm`}>
                  Start Today's Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizCategoryPage() {
  const { isDarkMode, setCurrentPage, setCurrentQuiz } = useApp();
  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          All <span className="gradient-text">Quizzes</span>
        </h1>
        <p className={`text-sm mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Browse all available quizzes by category</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { title: 'SSC GD 2024', cat: 'SSC', q: 80, icon: '🏛️', color: 'from-purple-500 to-indigo-600' },
            { title: 'SSC CGL Tier I', cat: 'SSC', q: 100, icon: '📋', color: 'from-blue-500 to-purple-600' },
            { title: 'RRB NTPC CBT1', cat: 'Railway', q: 100, icon: '🚂', color: 'from-cyan-500 to-blue-500' },
            { title: 'IBPS PO Prelims', cat: 'Banking', q: 100, icon: '🏦', color: 'from-green-500 to-teal-600' },
            { title: 'UP Police SI', cat: 'Police', q: 120, icon: '👮', color: 'from-blue-600 to-indigo-700' },
            { title: 'CTET Paper I', cat: 'Teaching', q: 150, icon: '📚', color: 'from-pink-500 to-rose-600' },
            { title: 'Army Agniveer', cat: 'Defence', q: 50, icon: '🎖️', color: 'from-amber-500 to-orange-600' },
            { title: 'General Knowledge', cat: 'GK', q: 50, icon: '🌍', color: 'from-blue-400 to-cyan-500' },
            { title: 'Reasoning Quiz', cat: 'Reasoning', q: 40, icon: '🧠', color: 'from-pink-400 to-rose-500' },
            { title: 'Maths Aptitude', cat: 'Maths', q: 50, icon: '🔢', color: 'from-purple-500 to-pink-500' },
            { title: 'English Grammar', cat: 'English', q: 45, icon: '✍️', color: 'from-green-400 to-teal-500' },
            { title: 'Hindi Vyakaran', cat: 'Hindi', q: 40, icon: '🗣️', color: 'from-red-500 to-pink-600' },
          ].map((quiz, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden card-hover ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-md`}>
              <div className={`bg-gradient-to-br ${quiz.color} p-4 relative`}>
                <div className="text-2xl mb-1">{quiz.icon}</div>
                <div className="text-white/80 text-xs">{quiz.cat}</div>
                <h3 className="text-white font-bold text-sm">{quiz.title}</h3>
                <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full" />
              </div>
              <div className="p-4">
                <div className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{quiz.q} Questions</div>
                <button onClick={() => { setCurrentQuiz(quiz); setCurrentPage('quiz'); }} className={`w-full bg-gradient-to-r ${quiz.color} text-white font-semibold py-2.5 rounded-xl text-xs hover:shadow-lg transition-all`}>
                  Start Quiz →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageRouter() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'quiz': return <QuizPage />;
      case 'quiz-category': return <QuizCategoryPage />;
      case 'mock-tests': return <MockTestsPage />;
      case 'daily-quiz': return <DailyQuizPage />;
      case 'current-affairs': return <CurrentAffairsPage />;
      case 'leaderboard': return <LeaderboardPage />;
      case 'blog': return <BlogPage />;
      case 'dashboard': return <DashboardPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'disclaimer': return <DisclaimerPage />;
      case 'faq': return <FAQPage />;
      case 'register': return <RegisterPage />;
      default: return <HomePage />;
    }
  };

  return renderPage();
}

function AppContent() {
  const { isDarkMode, currentPage } = useApp();
  const isQuizPage = currentPage === 'quiz';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <main>
        <PageRouter />
      </main>
      {!isQuizPage && <Footer />}

      {/* Floating action button */}
      <FloatingActions />
    </div>
  );
}

function FloatingActions() {
  const { setCurrentPage, isDarkMode } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-700'} border border-gray-200`}
        title="Scroll to top"
      >
        ↑
      </button>
      <button
        onClick={() => setCurrentPage('quiz')}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-all pulse-glow"
        title="Start Quiz"
      >
        🚀
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
