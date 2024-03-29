import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '~platform';

const navItems = [
  { name: 'Home', href: '/home', icon: 'home' },
  { name: 'Tasks', href: '/tasks', icon: 'tasks' },
  { name: 'Planning', href: '/planning', icon: 'calendar' },
];

export const Navbar = () => {
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey) {
      navItems.forEach((item, i) => {
        const key = `${i + 1}`;
        if (event.key === key) {
          event.preventDefault();
          router.push(item.href)
            .catch((e) => { console.log(e); });
        }
      });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav className="fixed top-0 bottom-0 left-0 w-14 flex flex-col items-center space-y-4 bg-slate-950 z-50">
      {navItems.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          onClick={async (e) => {
            e.preventDefault();
            await router.push(href);
          }}
          className={`px-3 py-4 text-lg border-slate-950 hover:border-l-4 transition-all ${
            router.pathname === href ? '!border-white text-white border-l-4' : 'text-white/50 hover:text-white'
          }`}
        >
          <Icon name={icon} size={6} />
        </a>
      ))}
    </nav>
  );
};
