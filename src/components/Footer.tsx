import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  'Top Exams': [
    { label: 'SSC CGL 2025', page: 'quiz' },
    { label: 'SSC GD Constable', page: 'quiz' },
    { label: 'SSC CHSL', page: 'quiz' },
    { label: 'RRB NTPC', page: 'quiz' },
    { label: 'RRB Group D', page: 'quiz' },
    { label: 'IBPS PO', page: 'quiz' },
    { label: 'SBI Clerk', page: 'quiz' },
    { label: 'UPSC CSE', page: 'quiz' },
    { label: 'UP Police', page: 'quiz' },
  ],
  'Quiz Categories': [
    { label: 'Current Affairs', page: 'current-affairs' },
    { label: 'General Knowledge', page: 'quiz-category' },
    { label: 'Reasoning', page: 'quiz-category' },
    { label: 'Mathematics', page: 'quiz-category' },
    { label: 'English Grammar', page: 'quiz-category' },
    { label: 'Hindi Vyakaran', page: 'quiz-category' },
    { label: 'Computer', page: 'quiz-category' },
    { label: 'Science', page: 'quiz-category' },
  ],
  'Quick Links': [
    { label: 'Free Mock Tests', page: 'mock-tests' },
    { label: 'Daily Quiz', page: 'daily-quiz' },
    { label: 'Leaderboard', page: 'leaderboard' },
    { label: 'Blog & News', page: 'blog' },
    { label: 'Exam Calendar', page: 'blog' },
    { label: 'Admit Cards', page: 'blog' },
    { label: 'Results', page: 'blog' },
    { label: 'Answer Keys', page: 'blog' },
  ],
  'Company': [
    { label: 'About Us', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms & Conditions', page: 'terms' },
    { label: 'Disclaimer', page: 'disclaimer' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Advertise With Us', page: 'contact' },
    { label: 'Careers', page: 'about' },
  ],
};

export default function Footer() {
  const { isDarkMode, setCurrentPage } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-900'} text-gray-400`}>
      {/* Newsletter bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-xl">📧 Get Daily Exam Updates</h3>
              <p className="text-blue-100 text-sm">Join 500K+ students receiving daily quiz alerts & exam notifications</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm outline-none"
              />
              <button className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <div>
                <div className="font-black text-xl text-white">
                  <span className="text-blue-400">Quiz</span>Rank<span className="text-orange-400"> India</span>
                </div>
                <div className="text-gray-500 text-xs">Govt Jobs Quiz Portal</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              India's most trusted government exam quiz platform. Practice daily, track progress, and get selected in your dream government job.
            </p>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-center gap-2"><Mail size={14} className="text-blue-400" /> support@quizrankindia.in</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-green-400" /> +91 9876543210</div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-red-400" /> New Delhi, India</div>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: '📘', label: 'Facebook', color: 'hover:bg-blue-600' },
                { icon: '🐦', label: 'Twitter', color: 'hover:bg-sky-500' },
                { icon: '📸', label: 'Instagram', color: 'hover:bg-pink-600' },
                { icon: '▶️', label: 'YouTube', color: 'hover:bg-red-600' },
                { icon: '💬', label: 'Telegram', color: 'hover:bg-blue-500' },
              ].map(social => (
                <button key={social.label} className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-sm ${social.color} transition-all hover:scale-110`} title={social.label}>
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => setCurrentPage(link.page)}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-5 bg-gray-800 rounded-2xl">
          {[
            { value: '5,840+', label: 'Total Quizzes', icon: '📝' },
            { value: '2.5M+', label: 'Happy Students', icon: '👥' },
            { value: '150+', label: 'Exams Covered', icon: '🎯' },
            { value: '250K+', label: 'Questions', icon: '❓' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-white font-black text-xl">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            '🔒 SSL Secured',
            '✅ Adsense Approved',
            '📱 Mobile Friendly',
            '🚀 Fast Loading',
            '♿ Accessible',
            '🌐 SEO Optimized',
          ].map(badge => (
            <div key={badge} className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-lg text-xs text-gray-400">
              {badge}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} QuizRank India. All rights reserved. Made with ❤️ for Government Job Aspirants of India.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            {[
              { label: 'Privacy Policy', page: 'privacy' },
              { label: 'Terms', page: 'terms' },
              { label: 'Disclaimer', page: 'disclaimer' },
              { label: 'Sitemap', page: 'home' },
            ].map(link => (
              <button key={link.label} onClick={() => setCurrentPage(link.page)} className="text-gray-500 hover:text-gray-300 transition-colors">
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl text-xs text-gray-500 text-center">
          <strong className="text-gray-400">Disclaimer:</strong> QuizRank India is an independent educational platform and is not affiliated with any government organization. Quiz content is for practice purposes only. Always verify information from official sources.
        </div>
      </div>
    </footer>
  );
}
