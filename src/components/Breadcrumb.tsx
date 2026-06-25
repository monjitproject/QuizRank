import { useApp } from '../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  page?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { isDarkMode, setCurrentPage } = useApp();

  return (
    <nav className="flex items-center gap-1 text-xs" aria-label="Breadcrumb">
      <button
        onClick={() => setCurrentPage('home')}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
      >
        <Home size={12} /> Home
      </button>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={12} className={isDarkMode ? 'text-gray-600' : 'text-gray-400'} />
          {item.page ? (
            <button
              onClick={() => setCurrentPage(item.page!)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
