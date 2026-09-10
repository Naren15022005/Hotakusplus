import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { CatalogGrid } from './components/CatalogGrid';
import { MediaModal } from './components/MediaModal';
import type { HanimeItem, HentaiHavenItem, Rule34Item, ProviderType, FilterCategory } from './types';
import { fetchHanimeSearch, fetchHhSearch, fetchR34Search } from './services/api';
import { Flame, Star, ShieldCheck, Sparkles, Play, Layers } from 'lucide-react';

export const App: React.FC = () => {
  const [provider, setProvider] = useState<ProviderType>('hanime');
  const [query, setQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [items, setItems] = useState<Array<HanimeItem | HentaiHavenItem | Rule34Item>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const loadData = async (prov: ProviderType, q: string) => {
    setLoading(true);
    let results: any[] = [];
    if (prov === 'hanime') {
      results = await fetchHanimeSearch(q);
    } else if (prov === 'hh') {
      results = await fetchHhSearch(q);
    } else {
      results = await fetchR34Search(q);
    }

    setItems(results);
    setLoading(false);
  };

  useEffect(() => {
    loadData(provider, query);
  }, [provider, query]);

  const handleSelectProvider = (prov: ProviderType) => {
    setProvider(prov);
    setQuery('');
    setCategoryFilter('all');
  };

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  // Filter items by category tab
  const filteredItems = items.filter((item: any) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'popular') return (item.rating && item.rating >= 4.8) || (item.views && item.views > 900000);
    if (categoryFilter === 'uncensored') return item.isCensored === false || item.tags?.includes?.('Sin Censura');
    if (categoryFilter === 'recent') return item.released >= 2024 || (item.rankMonthly && item.rankMonthly <= 3);
    return true;
  });

  const featuredItem: any = items.length > 0 ? items[0] : null;

  return (
    <div className="app-container">
      <Navbar
        currentProvider={provider}
        onSelectProvider={handleSelectProvider}
        onSearch={handleSearch}
      />

      <main className="main-content">
        {/* Featured Hero Banner */}
        {featuredItem && !query && (
          <div className="glass-panel" style={{
            margin: '0.5rem 0 1.5rem 0',
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(99,102,241,0.15) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            minHeight: '280px'
          }}>
            <div style={{
              flex: '1.2',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 2
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-uncensored" style={{ background: 'linear-gradient(90deg, #ec4899, #818cf8)', color: '#fff', fontWeight: 700 }}>
                  <Sparkles size={13} /> DESTACADO DEL MES
                </span>
                {featuredItem.rating && (
                  <span className="badge badge-rating">
                    <Star size={13} fill="#fbbf24" color="#fbbf24" /> ⭐ {featuredItem.rating}
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: '0.25rem 0 0.75rem 0', lineHeight: 1.2, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {featuredItem.name || featuredItem.title || `Serie #${featuredItem.id}`}
              </h1>

              <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '650px', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {featuredItem.description || featuredItem.summary || 'Serie de alta definición disponible con múltiples capítulos y servidores de reproducción HD.'}
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => setSelectedItem(featuredItem)}
                  className="search-btn"
                  style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', borderRadius: '12px', background: 'linear-gradient(90deg, #ec4899, #818cf8)' }}
                >
                  <Play size={18} fill="#fff" /> Reproducir Ahora
                </button>
                {featuredItem.episodes?.all && (
                  <span style={{ fontSize: '0.88rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Layers size={15} /> {featuredItem.episodes.all.length} Capítulos Disponibles
                  </span>
                )}
              </div>
            </div>

            <div style={{
              flex: '0.8',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={featuredItem.bannerImage || featuredItem.coverImage || featuredItem.cover || featuredItem.image}
                alt="Featured"
                referrerPolicy="no-referrer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maskImage: 'linear-gradient(to right, transparent, black 40%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)'
                }}
              />
            </div>
          </div>
        )}

        {/* Category Filters bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`source-btn ${categoryFilter === 'all' ? 'active' : ''}`}
            >
              <Flame size={14} /> Mostrar Todo ({filteredItems.length} Contenidos)
            </button>
            <button
              onClick={() => setCategoryFilter('popular')}
              className={`source-btn ${categoryFilter === 'popular' ? 'active' : ''}`}
            >
              <Star size={14} /> Populares
            </button>
            <button
              onClick={() => setCategoryFilter('uncensored')}
              className={`source-btn ${categoryFilter === 'uncensored' ? 'active' : ''}`}
            >
              <ShieldCheck size={14} /> Sin Censura
            </button>
            <button
              onClick={() => setCategoryFilter('recent')}
              className={`source-btn ${categoryFilter === 'recent' ? 'active' : ''}`}
            >
              <Sparkles size={14} /> Recientes
            </button>
          </div>
        </div>

        <CatalogGrid
          items={filteredItems}
          provider={provider}
          loading={loading}
          onSelectItem={(item: any) => setSelectedItem(item)}
        />
      </main>

      {selectedItem && (
        <MediaModal
          item={selectedItem}
          provider={provider}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default App;
