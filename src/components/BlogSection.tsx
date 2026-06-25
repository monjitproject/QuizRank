import { useApp } from '../context/AppContext';
import { blogPosts } from '../data/quizData';
import { Clock, Eye, ArrowRight, Tag } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'Syllabus': 'bg-blue-100 text-blue-700',
  'Notification': 'bg-red-100 text-red-700',
  'Exam Dates': 'bg-orange-100 text-orange-700',
  'Answer Key': 'bg-green-100 text-green-700',
  'Current Affairs': 'bg-purple-100 text-purple-700',
  'Defence': 'bg-amber-100 text-amber-700',
};

export default function BlogSection() {
  const { setCurrentPage, isDarkMode } = useApp();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-indigo-100">
              📰 Latest Articles
            </div>
            <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins' }}>
              Govt Jobs <span className="gradient-text">News & Updates</span>
            </h2>
          </div>
          <button onClick={() => setCurrentPage('blog')} className="flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm">
            View All Articles <ArrowRight size={16} />
          </button>
        </div>

        {/* Blog categories quick filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Notification', 'Syllabus', 'Answer Key', 'Exam Dates', 'Results', 'Current Affairs'].map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${cat === 'All' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-md' : isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured post */}
          <div
            onClick={() => setCurrentPage('blog')}
            className={`blog-card lg:col-span-1 lg:row-span-2 rounded-2xl border overflow-hidden cursor-pointer shadow-lg group ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100'}`}
          >
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden relative flex items-center justify-center blog-image transition-transform duration-300">
              <span className="text-8xl opacity-80">{blogPosts[0].image}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white ${categoryColors[blogPosts[0].category]}`}>
                  {blogPosts[0].category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className={`font-bold text-base mb-2 leading-tight group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {blogPosts[0].title}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{blogPosts[0].excerpt}</p>
              <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <span className="flex items-center gap-1"><Clock size={11} /> {blogPosts[0].readTime}</span>
                <span className="flex items-center gap-1"><Eye size={11} /> {(blogPosts[0].views / 1000).toFixed(0)}K</span>
                <span>{blogPosts[0].date}</span>
              </div>
            </div>
          </div>

          {/* Other posts */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {blogPosts.slice(1).map((post) => (
              <div
                key={post.id}
                onClick={() => setCurrentPage('blog')}
                className={`blog-card rounded-2xl border overflow-hidden cursor-pointer shadow-md group ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100'}`}
              >
                <div className="h-28 bg-gradient-to-br from-blue-400 to-indigo-600 overflow-hidden relative flex items-center justify-center blog-image transition-transform duration-300">
                  <span className="text-4xl opacity-80">{post.image}</span>
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`font-bold text-sm mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </h3>
                  <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {(post.views / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags cloud */}
        <div className={`mt-10 p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-100'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Tag size={14} className="text-gray-500" />
            <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Popular Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['SSC CGL 2025', 'RRB NTPC', 'UPSC 2025', 'Current Affairs', 'IBPS PO', 'UP Police', 'Army Agniveer', 'Syllabus', 'Admit Card', 'Result', 'Answer Key', 'Cut Off', 'Mock Test', 'Preparation Tips', 'CTET 2025', 'NDA 2025'].map(tag => (
              <button
                key={tag}
                onClick={() => setCurrentPage('blog')}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all hover:-translate-y-0.5 ${isDarkMode ? 'border-slate-600 text-gray-400 hover:border-blue-500 hover:text-blue-400' : 'border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
