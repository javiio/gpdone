import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { HomeIcon, CalendarDaysIcon, StarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Planning', href: '/planning', icon: CalendarDaysIcon },
  { name: 'Goals', href: '/goals', icon: StarIcon },
  { name: 'Notes', href: '/notes', icon: DocumentTextIcon },
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
    <nav className="fixed top-0 left-0 h-full w-16 flex flex-col items-center bg-slate-950">
      {navItems.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          onClick={async (e) => {
            e.preventDefault();
            await router.push(href);
          }}
          className={`p-4 text-lg border-slate-950 hover:border-l-4 ${
            router.pathname === href ? '!border-white text-white border-l-4' : 'text-white/50 hover:text-white'
          }`}
        >
          <Icon className="h-7 w-7" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
};
