import React from 'react';
import { Star, Eye, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { HanimeItem, HentaiHavenItem, Rule34Item, ProviderType } from '../types';

interface CatalogCardProps {
  item: HanimeItem | HentaiHavenItem | Rule34Item;
  provider: ProviderType;
  onClick: () => void;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ item, provider, onClick }) => {
  if (provider === 'hanime') {
    const hanime = item as HanimeItem;
    const cover = hanime.coverImage || hanime.bannerImage || hanime.posterUrl || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop';
    const rating = hanime.rating ? `⭐ ${hanime.rating}` : '⭐ 4.5';
    const views = hanime.views ? `${(hanime.views / 1000).toFixed(0)}k vistas` : 'Popular';
    const tags = (hanime.tags || []).slice(0, 3);

    return (
      <div className="catalog-card" onClick={onClick}>
        <div className="card-image-wrap">
          <img
            src={cover}
            alt={hanime.name || hanime.slug}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop'; }}
          />
          <div className="card-badges">
            <span className="badge badge-rating">
              <Star size={12} fill="#fbbf24" color="#fbbf24" /> {rating.replace('⭐ ', '')}
            </span>
            {hanime.isCensored ? (
              <span className="badge badge-censored">
                <ShieldAlert size={12} /> Censored
              </span>
            ) : (
              <span className="badge badge-uncensored">
                <ShieldCheck size={12} /> Uncensored
              </span>
            )}
          </div>
        </div>
        <div className="card-content">
          <div className="card-title">{hanime.name || hanime.title || hanime.slug}</div>
          <div className="card-meta">
            <span>{hanime.brand?.name || 'Estudio Anónimo'}</span> • <span><Eye size={12} /> {views}</span>
          </div>
          <div className="tags-list">
            {tags.map((t, idx) => (
              <span key={idx} className="tag-item">
                {typeof t === 'string' ? t : t.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (provider === 'hh') {
    const hh = item as HentaiHavenItem;
    const cover = hh.cover || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop';
    const rating = hh.rating ? `⭐ ${hh.rating}` : '⭐ 4.6';
    const eps = hh.totalEpisodes ? `${hh.totalEpisodes} Eps` : 'Serie';
    const genres = (hh.genres || []).slice(0, 3);

    return (
      <div className="catalog-card" onClick={onClick}>
        <div className="card-image-wrap">
          <img
            src={cover}
            alt={hh.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop'; }}
          />
          <div className="card-badges">
            <span className="badge badge-rating">
              <Star size={12} fill="#fbbf24" color="#fbbf24" /> {rating.replace('⭐ ', '')}
            </span>
            <span className="badge">{eps}</span>
          </div>
        </div>
        <div className="card-content">
          <div className="card-title">{hh.title}</div>
          <div className="card-meta">
            <span>{hh.author || 'HentaiHaven'}</span> • <span>{hh.released || 2024}</span>
          </div>
          <div className="tags-list">
            {genres.map((g, idx) => (
              <span key={idx} className="tag-item">
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const r34 = item as Rule34Item;
  const image = r34.image || r34.fullImage || 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop';
  const tags = (r34.tags || []).slice(0, 3);

  return (
    <div className="catalog-card" onClick={onClick}>
      <div className="card-image-wrap" style={{ paddingTop: '100%' }}>
        <img
          src={image}
          alt="Rule34"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop'; }}
        />
        <div className="card-badges">
          <span className="badge">Rule34 #{r34.id}</span>
        </div>
      </div>
      <div className="card-content">
        <div className="card-title">Ilustración #{r34.id}</div>
        <div className="tags-list">
          {tags.map((t, idx) => (
            <span key={idx} className="tag-item">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
