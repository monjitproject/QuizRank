import { useApp } from '../context/AppContext';

interface AdBannerProps {
  type?: 'banner' | 'rectangle' | 'leaderboard' | 'sidebar';
  className?: string;
}

export default function AdBanner({ type = 'banner', className = '' }: AdBannerProps) {
  const { isDarkMode } = useApp();

  const sizes: Record<string, { w: string; h: string; label: string }> = {
    banner: { w: 'w-full', h: 'h-16', label: 'Advertisement — 728×90 Leaderboard Ad' },
    rectangle: { w: 'w-full', h: 'h-64', label: 'Advertisement — 300×250 Rectangle Ad' },
    leaderboard: { w: 'w-full', h: 'h-24', label: 'Advertisement — 970×90 Billboard Ad' },
    sidebar: { w: 'w-full', h: 'h-96', label: 'Advertisement — 300×600 Sidebar Ad' },
  };

  const size = sizes[type];

  return (
    <div className={`${size.w} ${size.h} ${className} flex items-center justify-center rounded-xl border text-xs font-medium ${isDarkMode ? 'bg-slate-800 border-slate-700 text-gray-500' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
      <div className="text-center">
        <div className="text-base mb-1">📢</div>
        <div>{size.label}</div>
        <div className="text-[10px] mt-0.5 opacity-60">Google AdSense Placement</div>
      </div>
    </div>
  );
}
