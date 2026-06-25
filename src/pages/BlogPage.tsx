import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { blogPosts } from '../data/quizData';
import { Clock, Eye, Search, Tag, ArrowRight } from 'lucide-react';

const allCategories = ['All', 'Notification', 'Syllabus', 'Answer Key', 'Exam Dates', 'Results', 'Current Affairs', 'Defence'];

const extendedPosts = [
  ...blogPosts,
  { id: 7, title: 'UPSC CSE 2025 Syllabus: Complete Topic-Wise Breakdown for IAS Preparation', category: 'Syllabus', date: '2025-01-09', readTime: '12 min', views: 78901, image: '⚖️', tags: ['UPSC', 'IAS', 'Syllabus'], excerpt: 'Detailed UPSC CSE 2025 syllabus breakdown with topic-wise preparation strategy for both Prelims and Mains examination.' },
  { id: 8, title: 'SSC CGL Result 2024 Out: Check Scores, Cut-Off & Merit List', category: 'Results', date: '2025-01-08', readTime: '4 min', views: 234567, image: '📊', tags: ['SSC', 'CGL', 'Result'], excerpt: 'SSC CGL 2024 results declared. Check tier-wise cut-off marks, merit list download link, and next steps for qualified candidates.' },
  { id: 9, title: 'How to Crack SSC GD in First Attempt: Complete Strategy Guide 2025', category: 'Syllabus', date: '2025-01-07', readTime: '15 min', views: 56234, image: '🎯', tags: ['SSC', 'GD', 'Strategy'], excerpt: 'Step-by-step preparation strategy to crack SSC GD Constable exam in the first attempt with proper study plan and resources.' },
  { id: 10, title: 'Banking Exam Calendar 2025: All Important Dates for IBPS, SBI, RBI', category: 'Exam Dates', date: '2025-01-06', readTime: '6 min', views: 89012, image: '📅', tags: ['Banking', 'IBPS', 'SBI'], excerpt: 'Complete banking exam calendar 2025 with all important notification, exam, result and interview dates for IBPS PO, Clerk, SBI PO, SBI Clerk and RBI exams.' },
];

export default function BlogPage() {
  const { isDarkMode } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = extendedPosts.filter(post => {
    const matchCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categoryColors: Record<string, string> = {
    'Syllabus': 'bg-blue-100 text-blue-700',
    'Notification': 'bg-red-100 text-red-700',
    'Exam Dates': 'bg-orange-100 text-orange-700',
    'Answer Key': 'bg-green-100 text-green-700',
    'Current Affairs': 'bg-purple-100 text-purple-700',
    'Defence': 'bg-amber-100 text-amber-700',
    'Results': 'bg-teal-100 text-teal-700',
  };

  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
            Govt Jobs <span className="gradient-text">News & Blog</span>
          </h1>
          <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Latest exam notifications, syllabus, results, admit cards and preparation tips
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-md`}>
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles, exam news..."
              className={`flex-1 bg-transparent text-sm outline-none ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900'}`}
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : isDarkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main posts */}
          <div className="lg:col-span-2 space-y-5">
            {filtered.map(post => (
              <div key={post.id} className={`flex gap-4 p-5 rounded-2xl border cursor-pointer hover:shadow-lg transition-all group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-gray-100'}`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-4xl flex-shrink-0">
                  {post.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                      {post.category}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{post.date}</span>
                  </div>
                  <h3 className={`font-bold text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.excerpt}</p>
                  <div className={`flex items-center gap-4 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} read</span>
                    <span className="flex items-center gap-1"><Eye size={11} /> {(post.views / 1000).toFixed(0)}K views</span>
                    <span className="flex items-center gap-1 text-blue-600 font-medium ml-auto">
                      Read More <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🔍</div>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No articles found matching your search.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Trending */}
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <h3 className={`font-bold text-sm mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>🔥 Trending Articles</h3>
              {extendedPosts.sort((a, b) => b.views - a.views).slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex gap-3 py-3 border-b last:border-0 cursor-pointer group border-gray-50">
                  <span className={`font-black text-2xl w-6 flex-shrink-0 ${i === 0 ? 'text-red-500' : i === 1 ? 'text-orange-500' : 'text-gray-400'}`}>
                    {i + 1}
                  </span>
                  <p className={`text-xs leading-snug group-hover:text-blue-600 transition-colors font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {p.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className={`rounded-2xl border p-5 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <h3 className={`font-bold text-sm mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Tag size={14} /> Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['SSC CGL', 'UPSC 2025', 'Railway', 'Banking', 'UP Police', 'CTET', 'Admit Card', 'Result', 'Answer Key', 'Syllabus', 'Current Affairs', 'Army Agniveer'].map(tag => (
                  <button key={tag} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${isDarkMode ? 'border-slate-600 text-gray-400 hover:border-blue-500 hover:text-blue-400' : 'border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'}`}>
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-5 text-white">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-bold mb-2">Get Exam Updates</h3>
              <p className="text-blue-100 text-xs mb-4">Subscribe for daily exam notifications</p>
              <input type="email" placeholder="your@email.com" className="w-full px-3 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 text-xs mb-2 border border-white/30 outline-none" />
              <button className="w-full bg-white text-blue-700 font-bold text-xs py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
