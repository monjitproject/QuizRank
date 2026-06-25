import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  quizzesAttempted: number;
  totalScore: number;
  rank: number;
  badges: string[];
  joinDate: string;
}

interface QuizResult {
  quizId: string;
  title: string;
  score: number;
  total: number;
  date: string;
  timeTaken: number;
  correct: number;
  incorrect: number;
  skipped: number;
}

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: Notification[];
  markAllRead: () => void;
  bookmarks: string[];
  toggleBookmark: (quizId: string) => void;
  quizResults: QuizResult[];
  addQuizResult: (result: QuizResult) => void;
  currentQuiz: any;
  setCurrentQuiz: (quiz: any) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

const defaultNotifications: Notification[] = [
  { id: '1', title: 'New Quiz Available!', message: 'SSC GD 2025 Mock Test is now live', time: '2 min ago', read: false, type: 'success' },
  { id: '2', title: 'Daily Quiz Ready', message: 'Today\'s Current Affairs Quiz is ready', time: '1 hour ago', read: false, type: 'info' },
  { id: '3', title: 'New Exam Notification', message: 'RRB NTPC 2025 notification released', time: '3 hours ago', read: false, type: 'warning' },
  { id: '4', title: 'Leaderboard Update', message: 'You are now ranked #42 this week!', time: '5 hours ago', read: true, type: 'success' },
  { id: '5', title: 'Result Published', message: 'SSC CGL 2024 Result has been published', time: '1 day ago', read: true, type: 'info' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode');
    if (savedDark === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) setQuizResults(JSON.parse(savedResults));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const login = (email: string, _password: string): boolean => {
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      avatar: '👤',
      role: email === 'admin@quizrank.in' ? 'admin' : 'user',
      quizzesAttempted: 47,
      totalScore: 8750,
      rank: 42,
      badges: ['🏆', '⭐', '🎯', '🔥'],
      joinDate: '2024-06-15',
    };
    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const register = (name: string, email: string, _password: string): boolean => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: '👤',
      role: 'user',
      quizzesAttempted: 0,
      totalScore: 0,
      rank: 9999,
      badges: ['🌟'],
      joinDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleBookmark = (quizId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(quizId)
        ? prev.filter(id => id !== quizId)
        : [...prev, quizId];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const addQuizResult = (result: QuizResult) => {
    setQuizResults(prev => {
      const newResults = [result, ...prev];
      localStorage.setItem('quizResults', JSON.stringify(newResults));
      return newResults;
    });
  };

  return (
    <AppContext.Provider value={{
      isDarkMode, toggleDarkMode,
      isLoggedIn, user, login, logout, register,
      currentPage, setCurrentPage,
      searchQuery, setSearchQuery,
      notifications, markAllRead,
      bookmarks, toggleBookmark,
      quizResults, addQuizResult,
      currentQuiz, setCurrentQuiz,
      activeCategory, setActiveCategory,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
