// src/components/Header/Header.jsx
import { NavLink } from 'react-router-dom';

const Header = ({ churchName, churchLogoUrl, menus }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-outline-variant/15 bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          {churchLogoUrl ? (
            <img src={churchLogoUrl} alt={churchName || "HKBP Kernolong"} className="h-9 w-auto shrink-0 md:h-10" />
          ) : (
            <span className="truncate font-headline text-lg font-black uppercase tracking-tight text-primary md:text-xl">
              {churchName || "HKBP KERNOLONG"}
            </span>
          )}
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {menus && menus
            .filter(menu => menu.isActive)
            .sort((a, b) => a.order - b.order)
            .map(menu => (
              <NavLink
                key={menu.id} 
                to={menu.path}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 font-body text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-primary/5 hover:text-primary'
                  }`
                }
              >
                {menu.name}
              </NavLink>
            ))
          }
        </div>

        <a
          href="#footer"
          className="shrink-0 rounded-lg bg-primary px-4 py-2 font-body text-sm font-bold text-on-primary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:px-5"
        >
          Kontak
        </a>
      </div>
    </nav>
  );
};

export default Header;
