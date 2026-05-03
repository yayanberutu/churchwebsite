// src/components/Header/Header.jsx

const Header = ({ churchName, churchLogoUrl, menus }) => {
  return (
    <nav className="sticky top-0 w-full z-50 glass shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
        <a href="/" className="flex items-center gap-2">
          {churchLogoUrl ? (
            <img src={churchLogoUrl} alt={churchName} className="h-10 w-auto" />
          ) : (
            <span className="text-2xl font-black text-primary uppercase font-headline tracking-tight">
              {churchName || "HKBP KERNOLONG"}
            </span>
          )}
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menus && menus
            .filter(menu => menu.isActive)
            .sort((a, b) => a.order - b.order)
            .map(menu => (
              <a 
                key={menu.id} 
                href={menu.path}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm font-body"
              >
                {menu.name}
              </a>
            ))
          }
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-body text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
