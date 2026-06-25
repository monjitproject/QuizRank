import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/quizData';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function CategorySection() {
  const { setCurrentPage, isDarkMode } = useApp();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayCategories = showAll ? categories : categories.slice(0, 12);

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-100">
            <span>📚</span> All Exam Categories
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
            Explore{' '}
            <span className="gradient-text">20+ Exam Categories</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            From SSC to UPSC, Railway to Banking — practice quizzes for every government competitive exam
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayCategories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setCurrentPage('quiz-category')}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${hoveredId === cat.id ? 'scale-105 shadow-2xl' : 'scale-100 shadow-md'}`}
              style={{
                animationDelay: `${index * 0.05}s`,
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-100`} />
              
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <div className="text-white font-bold text-base mb-1" style={{ fontFamily: 'Poppins' }}>
                  {cat.name}
                </div>
                <div className="text-white/80 text-xs mb-3 leading-tight">
                  {cat.desc}
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-white/25 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {cat.quizCount} Quizzes
                  </span>
                  <ArrowRight size={14} className="text-white/70 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
            </button>
          ))}
        </div>

        {/* Show more */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-ripple"
          >
            <BookOpen size={18} />
            {showAll ? 'Show Less Categories' : `View All ${categories.length} Categories`}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
