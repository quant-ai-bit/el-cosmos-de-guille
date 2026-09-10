import React from 'react';
import { Feather, BookOpen, User, Sparkles } from 'lucide-react';
import { AUTOR_INFO } from '../data/poemas';

interface NavbarProps {
  currentView: 'home' | 'poem' | 'author';
  onNavigateHome: () => void;
  onNavigateAuthor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigateHome, onNavigateAuthor }) => {
  return (
    <header className="site-navbar">
      <div className="site-container nav-wrapper">
        <div className="brand-logo" onClick={onNavigateHome}>
          <div className="brand-symbol">
            <Feather size={20} />
          </div>
          <div>
            <h1 className="brand-title">{AUTOR_INFO.sitioTitulo}</h1>
            <p className="brand-subtitle">{AUTOR_INFO.nombre}</p>
          </div>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={onNavigateHome}
                style={{ background: 'none', border: 'none' }}
              >
                <BookOpen size={16} />
                <span>Poemario</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${currentView === 'author' ? 'active' : ''}`}
                onClick={onNavigateAuthor}
                style={{ background: 'none', border: 'none' }}
              >
                <User size={16} />
                <span>El Poeta</span>
              </button>
            </li>
            <li>
              <span className="badge-tag" style={{ border: '1px solid var(--gold-primary)', color: 'var(--gold-light)' }}>
                <Sparkles size={12} />
                <span>Edición Multimedia</span>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
