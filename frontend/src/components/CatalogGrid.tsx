import React from 'react';
import { CatalogCard } from './CatalogCard';
import type { HanimeItem, HentaiHavenItem, Rule34Item, ProviderType } from '../types';

interface CatalogGridProps {
  items: Array<HanimeItem | HentaiHavenItem | Rule34Item>;
  provider: ProviderType;
  onSelectItem: (item: HanimeItem | HentaiHavenItem | Rule34Item) => void;
  loading: boolean;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ items, provider, onSelectItem, loading }) => {
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-ring"></div>
        <p>Cargando catálogo desde la API...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <h3>No se encontraron contenidos</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Intenta realizar una nueva búsqueda o cambiar de proveedor.</p>
      </div>
    );
  }

  return (
    <div className="catalog-grid">
      {items.map((item, idx) => (
        <CatalogCard
          key={(item as any).id || idx}
          item={item}
          provider={provider}
          onClick={() => onSelectItem(item)}
        />
      ))}
    </div>
  );
};
