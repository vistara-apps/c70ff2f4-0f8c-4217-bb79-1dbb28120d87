'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Zap, Music, Play, BookOpen, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { ROUTES } from '../lib/constants';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', path: ROUTES.home },
  { id: 'generator', icon: Zap, label: 'Generate', path: ROUTES.generator },
  { id: 'routines', icon: Music, label: 'Routines', path: ROUTES.routines },
  { id: 'practice', icon: Play, label: 'Practice', path: ROUTES.practice },
  { id: 'library', icon: BookOpen, label: 'Library', path: ROUTES.library },
  { id: 'profile', icon: User, label: 'Profile', path: ROUTES.profile }
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20 z-50">
      <div className="max-w-4xl mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={cn(
                  'flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
