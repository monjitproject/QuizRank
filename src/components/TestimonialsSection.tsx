import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { testimonials } from '../data/quizData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const { isDarkMode } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-green-100">
            💬 Success Stories
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
            Students Who{' '}
            <span className="gradient-text">Got Selected</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real success stories from students who cracked government exams with QuizRank India
          </p>
        </div>

        {/* Main featured testimonial */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className={`rounded-3xl p-8 md:p-10 border shadow-xl relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
            {/* Quote icon */}
            <Quote size={60} className="absolute top-6 right-8 text-blue-100 opacity-50" />

            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg">
                  {testimonials[activeIndex].avatar}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={16} className={s <= testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className={`text-base md:text-lg leading-relaxed mb-5 italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonials[activeIndex].text}"
                </p>
                <div>
                  <div className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-blue-600 font-semibold text-sm">{testimonials[activeIndex].exam}</div>
                  <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    📍 {testimonials[activeIndex].location}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`transition-all duration-200 rounded-full ${i === activeIndex ? 'w-6 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of mini testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className={`testimonial-card rounded-2xl p-5 border shadow-md ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
                  <div className="text-blue-600 text-xs font-medium">{t.exam}</div>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={12} className={s <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <p className={`text-sm leading-relaxed line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>"{t.text}"</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '2.5M+', label: 'Happy Students', icon: '😊' },
            { value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
            { value: '50K+', label: 'Students Selected', icon: '🏆' },
            { value: '4.9/5', label: 'App Rating', icon: '📱' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl p-5 text-center border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-md`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-blue-600">{stat.value}</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
