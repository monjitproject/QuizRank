import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { examStats } from '../data/quizData';

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const startTime = Date.now();
        const timer = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress >= 1) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.3 });
    const el = document.getElementById(`counter-${target}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, started]);

  const formatNum = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  };

  return (
    <span id={`counter-${target}`} className="tabular-nums">
      {formatNum(count)}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const { setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');

  const tabs = ['All Exams', 'SSC', 'Railway', 'Banking', 'Police', 'UPSC'];

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(255, 119, 115, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.2) 0%, transparent 70%)`
        }} />
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-2xl float-animation flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20">📝</div>
        <div className="absolute top-40 right-20 w-14 h-14 bg-white/10 rounded-xl float-animation-2 flex items-center justify-center text-xl backdrop-blur-sm border border-white/20" style={{ animationDelay: '1s' }}>🏆</div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-xl float-animation flex items-center justify-center text-lg backdrop-blur-sm border border-white/20" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-white/10 rounded-2xl float-animation-2 flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20" style={{ animationDelay: '1.5s' }}>🎯</div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-yellow-400/20 rounded-xl float-animation flex items-center justify-center text-base backdrop-blur-sm" style={{ animationDelay: '2s' }}>💡</div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-green-400/20 rounded-xl float-animation-2 flex items-center justify-center text-lg backdrop-blur-sm" style={{ animationDelay: '0.8s' }}>📊</div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-in-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            🔥 Daily Updated Quizzes — India's #1 Govt Exam Portal
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: 'Poppins' }}>
            Practice Govt Exam
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300">
              Questions Daily
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Latest Government Exam Quizzes Updated Every Day. SSC, UPSC, Railway, Banking, Police & 150+ Exams. 
            <br className="hidden sm:block" />
            <strong className="text-white">Practice Smart. Rank Higher. Get Selected.</strong>
          </p>

          {/* Search box */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 overflow-hidden p-1.5 shadow-2xl">
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search quizzes, e.g. SSC GD, Current Affairs, Reasoning..."
                className="flex-1 bg-transparent text-white placeholder-blue-200 px-4 py-3 text-sm outline-none"
              />
              <button onClick={() => setCurrentPage('quiz')} className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors flex-shrink-0">
                🔍 Search
              </button>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${activeTab === tab ? 'bg-white text-blue-700' : 'bg-white/15 text-white/90 hover:bg-white/25 border border-white/20'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <button
              onClick={() => setCurrentPage('quiz')}
              className="group flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-ripple text-sm"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform">🚀</span>
              Start Quiz Now
            </button>
            <button
              onClick={() => setCurrentPage('mock-tests')}
              className="group flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold px-7 py-4 rounded-2xl border border-white/30 hover:bg-white/25 hover:-translate-y-1 transition-all duration-300 btn-ripple text-sm"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform">📋</span>
              Mock Tests
            </button>
            <button
              onClick={() => setCurrentPage('daily-quiz')}
              className="group flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold px-7 py-4 rounded-2xl border border-white/30 hover:bg-white/25 hover:-translate-y-1 transition-all duration-300 btn-ripple text-sm"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform">📅</span>
              Daily Quiz
            </button>
            <button
              onClick={() => setCurrentPage('current-affairs')}
              className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-7 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-ripple text-sm"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform">📰</span>
              Current Affairs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {examStats.map((stat, i) => (
              <div
                key={i}
                className="stat-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 transition-all cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-blue-200 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/70 text-xs">
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Free Practice</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Detailed Explanations</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Daily Updates</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> All India Ranking</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Hindi & English Both</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Mobile Friendly</span>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill="white" fillOpacity="0.05" />
          <path d="M0,80 L1440,80 L1440,60 C1200,40 960,70 720,55 C480,40 240,65 0,50 Z" fill="rgb(248,250,252)" />
        </svg>
      </div>
    </section>
  );
}
