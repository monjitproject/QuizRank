import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bell, Moon, Sun, Menu, X, ChevronDown, BookOpen, LogOut, User, Settings, Trophy, Bookmark } from 'lucide-react';

const navItems = [
  {
    label: 'Exams',
    children: [
      { label: 'SSC Exams', items: ['SSC CGL', 'SSC CHSL', 'SSC GD', 'SSC CPO', 'SSC MTS', 'SSC JE'] },
      { label: 'Railway', items: ['RRB NTPC', 'RRB Group D', 'RRB ALP', 'RRB JE', 'RPF Constable'] },
      { label: 'Banking', items: ['IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'RBI Grade B'] },
      { label: 'UPSC', items: ['UPSC CSE', 'UPSC CAPF', 'UPSC CDS', 'UPSC NDA', 'UPSC ESE'] },
    ]
  },
  {
    label: 'Subjects',
    children: [
      { label: 'Core Subjects', items: ['General Knowledge', 'Reasoning', 'Maths', 'English', 'Hindi'] },
      { label: 'Science', items: ['Physics', 'Chemistry', 'Biology', 'Computer Science'] },
      { label: 'Social Studies', items: ['History', 'Geography', 'Polity', 'Economics'] },
      { label: 'Current Affairs', items: ['Daily CA', 'Monthly CA', 'Yearly CA', 'CA Quiz'] },
    ]
  },
  { label: 'Mock Tests', href: 'mock-tests' },
  { label: 'Daily Quiz', href: 'daily-quiz' },
  { label: 'Leaderboard', href: 'leaderboard' },
  { label: 'Blog', href: 'blog' },
];

export default function Header() {
  const { isDarkMode, toggleDarkMode, isLoggedIn, user, logout, setCurrentPage, notifications, markAllRead, setSearchQuery, searchQuery } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`sticky-header transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''} ${isDarkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-100'}`}>
        {/* Top bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs py-1.5">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">📢 RRB NTPC 2025 Notification Released! <button onClick={() => navigate('blog')} className="underline font-medium ml-1">Read More</button></span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <span>📱 Download App</span>
              <span>|</span>
              <button onClick={() => navigate('about')} className="hover:underline">About</button>
              <button onClick={() => navigate('contact')} className="hover:underline">Contact</button>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <button onClick={() => navigate('home')} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg leading-tight" style={{ fontFamily: 'Poppins' }}>
                  <span className="text-blue-600">Quiz</span><span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Rank</span>
                  <span className="text-orange-500"> India</span>
                </div>
                <div className={`text-[10px] leading-tight ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Govt Jobs Quiz Portal</div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeDropdown === item.label ? 'bg-blue-50 text-blue-600' : isDarkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(item.href || '')}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Mega dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] rounded-2xl shadow-2xl border z-50 overflow-hidden dropdown-shadow ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                      <div className="grid grid-cols-4 gap-0">
                        {item.children.map((col) => (
                          <div key={col.label} className={`p-4 ${isDarkMode ? 'border-r border-slate-700 last:border-0' : 'border-r border-gray-50 last:border-0'}`}>
                            <div className="text-blue-600 font-semibold text-xs uppercase tracking-wider mb-3">{col.label}</div>
                            {col.items.map((subItem) => (
                              <button
                                key={subItem}
                                onClick={() => navigate('quiz-category')}
                                className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                              >
                                {subItem}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 flex justify-between items-center">
                        <span className="text-white text-sm font-medium">🔥 Start Today's Free Quiz</span>
                        <button onClick={() => navigate('quiz')} className="bg-white text-blue-600 text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Start Now →</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2" ref={dropdownRef}>
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-xl transition-all ${isDarkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Search size={18} />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                  className={`relative p-2 rounded-xl transition-all ${isDarkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center notification-dot">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className={`absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden dropdown-shadow ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                    <div className="p-4 flex justify-between items-center border-b border-gray-100">
                      <span className="font-semibold text-sm">Notifications</span>
                      <button onClick={markAllRead} className="text-blue-600 text-xs hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`p-3 border-b border-gray-50 flex gap-3 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.type === 'success' ? 'bg-green-500' : notif.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                          <div>
                            <div className="text-sm font-medium">{notif.title}</div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notif.message}</div>
                            <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button className="text-blue-600 text-sm hover:underline">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all ${isDarkMode ? 'text-yellow-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* User profile / login */}
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all"
                  >
                    <span className="text-base">{user.avatar}</span>
                    <span className="hidden sm:block">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} />
                  </button>

                  {isProfileOpen && (
                    <div className={`absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-2xl border z-50 overflow-hidden dropdown-shadow ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                      <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <div className="text-2xl mb-1">{user.avatar}</div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-blue-100">{user.email}</div>
                        <div className="mt-2 flex gap-3 text-xs">
                          <span>🏆 Rank #{user.rank}</span>
                          <span>📝 {user.quizzesAttempted} Quizzes</span>
                        </div>
                      </div>
                      <div className="py-2">
                        {[
                          { icon: <User size={15} />, label: 'My Profile', page: 'dashboard' },
                          { icon: <Trophy size={15} />, label: 'Achievements', page: 'dashboard' },
                          { icon: <Bookmark size={15} />, label: 'Bookmarks', page: 'dashboard' },
                          { icon: <BookOpen size={15} />, label: 'Quiz History', page: 'dashboard' },
                          { icon: <Settings size={15} />, label: 'Settings', page: 'dashboard' },
                        ].map(item => (
                          <button key={item.label} onClick={() => { navigate(item.page); setIsProfileOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                            <span className="text-blue-500">{item.icon}</span>
                            {item.label}
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                            <LogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => setLoginModal(true)} className={`hidden sm:block text-sm font-medium px-4 py-2 rounded-xl transition-all ${isDarkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Login
                  </button>
                  <button onClick={() => navigate('register')} className="text-sm font-medium px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all btn-ripple">
                    Register
                  </button>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl ${isDarkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <div className="py-3 border-t border-gray-100">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quizzes, exams, topics... (e.g. SSC GD, Reasoning, Current Affairs)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className={`mt-2 p-2 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
                  {['SSC GD Quiz', 'RRB NTPC Quiz', 'Current Affairs', 'Reasoning Quiz'].filter(q => q.toLowerCase().includes(searchQuery.toLowerCase())).map(result => (
                    <button key={result} onClick={() => { navigate('quiz'); setIsSearchOpen(false); setSearchQuery(''); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <Search size={14} className="text-gray-400" />
                      {result}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} max-h-[80vh] overflow-y-auto`}>
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-xl font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.flatMap(col => col.items).map(subItem => (
                            <button key={subItem} onClick={() => navigate('quiz-category')} className={`w-full text-left px-4 py-2 rounded-lg text-sm ${isDarkMode ? 'text-gray-400 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                              {subItem}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(item.href || '')}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm ${isDarkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              {!isLoggedIn && (
                <div className="pt-3 flex gap-2">
                  <button onClick={() => { setLoginModal(true); setIsMobileMenuOpen(false); }} className="flex-1 py-2.5 rounded-xl border border-blue-600 text-blue-600 text-sm font-medium">Login</button>
                  <button onClick={() => navigate('register')} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">Register</button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}
    </>
  );
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const { login, isDarkMode } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill all fields'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const success = login(email, password);
    if (success) onClose();
    else setError('Invalid credentials');
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <div className="text-3xl mb-2">🎯</div>
          <h2 className="text-xl font-bold">Welcome Back!</h2>
          <p className="text-blue-100 text-sm">Sign in to continue your exam journey</p>
        </div>
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{error}</div>}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Remember me</span>
            </label>
            <button type="button" className="text-blue-600 hover:underline">Forgot password?</button>
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all btn-ripple disabled:opacity-70">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Don't have an account? <button type="button" className="text-blue-600 font-medium hover:underline">Register Free</button>
          </p>
          <div className="text-xs text-gray-400 text-center">Demo: any email + any password</div>
        </form>
      </div>
    </div>
  );
}
