import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import logo from '@/assets/aurora-intima.png';

const mainCategories = [
  { name: 'HOME', path: '/' },
  { name: 'PRODUTOS', path: '/produtos' },
  { name: 'BABYDOLL', path: '/produtos?categoria=babydoll' },
  { name: 'BODYS', path: '/produtos?categoria=bodys' },
  { name: 'CALCINHAS', path: '/produtos?categoria=calcinhas' },
];

const moreCategories = [
  { name: 'Camisolas', path: '/produtos?categoria=camisolas' },
  { name: 'Conjuntos', path: '/produtos?categoria=conjuntos' },
  { name: 'Croppeds', path: '/produtos?categoria=croppeds' },
];

export function Header() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/produtos?busca=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      {/* Top bar */}
      <div className="container flex items-center justify-between h-16 md:h-20 gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Aurora Íntima" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Search bar - desktop */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl mx-8"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você procura?"
              className="w-full h-11 pl-4 pr-12 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-dark"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center bg-dark text-dark-foreground hover:bg-foreground transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Link to="/carrinho" className="relative">
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-dark text-dark-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation - desktop */}
      <nav className="hidden md:block border-t border-border">
        <div className="container">
          <ul className="flex items-center justify-center gap-8 h-12">
            {mainCategories.map((cat) => (
              <li key={cat.name}>
                <Link to={cat.path} className="nav-link">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li className="relative">
              <button
                className="nav-link flex items-center gap-1"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                onBlur={() => setTimeout(() => setShowMoreMenu(false), 150)}
              >
                VER MAIS
                <ChevronDown className="w-4 h-4" />
              </button>
              {showMoreMenu && (
                <div className="absolute top-full left-0 mt-2 bg-background border border-border shadow-card py-2 min-w-[160px] z-50">
                  {moreCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <form onSubmit={handleSearch} className="p-4 border-b border-border">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que você procura?"
                className="w-full h-11 pl-4 pr-12 border border-border rounded-sm bg-background"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center bg-dark text-dark-foreground"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
          <nav className="py-2">
            {mainCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="block px-4 py-3 text-sm font-medium hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-2">
              {moreCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className="block px-4 py-3 text-sm hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
