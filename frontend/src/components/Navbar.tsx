import React, { useState } from 'react';
import { Search, Flame, Tv, Image as ImageIcon } from 'lucide-react';
import type { ProviderType } from '../types';

interface NavbarProps {
  currentProvider: ProviderType;
  onSelectProvider: (provider: ProviderType) => void;
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentProvider, onSelectProvider, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput.trim());
  };

  return (
    <>
      <header className="navbar glass-panel">
        <div className="navbar-inner">
          <div className="logo-box" onClick={() => { setSearchInput(''); onSelectProvider('hanime'); }}>
            <div className="logo-icon">H+</div>
            <div className="logo-text">HOTAKUSPLUS</div>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Buscar animes, series o etiquetas (deja vacío para ver todo)..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                onSearch(e.target.value.trim());
              }}
            />
            <button type="submit" className="search-btn">
              <Search size={16} /> Buscar
            </button>
          </form>
        </div>
      </header>

      <div className="tabs-section">
        <div className="tabs-group">
          <button
            className={`tab-button ${currentProvider === 'hanime' ? 'active' : ''}`}
            onClick={() => {
              setSearchInput('');
              onSelectProvider('hanime');
            }}
          >
            <Flame size={18} /> Hanime.tv
          </button>
          <button
            className={`tab-button ${currentProvider === 'hh' ? 'active' : ''}`}
            onClick={() => {
              setSearchInput('');
              onSelectProvider('hh');
            }}
          >
            <Tv size={18} /> HentaiHaven
          </button>
          <button
            className={`tab-button ${currentProvider === 'r34' ? 'active' : ''}`}
            onClick={() => {
              setSearchInput('');
              onSelectProvider('r34');
            }}
          >
            <ImageIcon size={18} /> Rule34
          </button>
        </div>
      </div>
    </>
  );
};
