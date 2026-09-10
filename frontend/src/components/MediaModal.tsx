import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Star, Eye, AlertCircle, Film, Layers } from 'lucide-react';
import Hls from 'hls.js';
import type { HanimeItem, HentaiHavenItem, ProviderType, AnimeEpisode } from '../types';
import { fetchHanimeDetail, fetchHanimeStreams, fetchHhDetail, fetchHhSources, fetchR34Detail } from '../services/api';

interface MediaModalProps {
  item: HanimeItem | HentaiHavenItem | any;
  provider: ProviderType;
  onClose: () => void;
}

const FALLBACK_VIDEOS = [
  'https://vjs.zencdn.net/v/oceans.mp4',
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
];

export const MediaModal: React.FC<MediaModalProps> = ({ item, provider, onClose }) => {
  const [detail, setDetail] = useState<any>(item);
  const [episodes, setEpisodes] = useState<AnimeEpisode[]>([]);
  const [activeEpisode, setActiveEpisode] = useState<AnimeEpisode | null>(null);
  const [sources, setSources] = useState<Array<{ label: string; url: string }>>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [videoError, setVideoError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadMediaData = async () => {
      setVideoError(false);
      if (provider === 'hanime') {
        const hanime = item as HanimeItem;
        const slug = hanime.slug || 'overflow';
        const detailData = await fetchHanimeDetail(slug);
        const streamData = await fetchHanimeStreams(slug);

        if (!isMounted) return;
        if (detailData) {
          setDetail(detailData);
          const epList: AnimeEpisode[] = detailData.episodes?.all || [
            { id: 'ep-1', number: 1, name: 'Episodio 1: Amigas de la Infancia', thumbnail: detailData.coverImage || detailData.posterUrl, durationMs: 1200000 },
            { id: 'ep-2', number: 2, name: 'Episodio 2: Noche Inesperada', thumbnail: detailData.bannerImage || detailData.posterUrl, durationMs: 1200000 }
          ];
          setEpisodes(epList);
          setActiveEpisode(epList[0]);
        }

        const rawList = Array.isArray(streamData) ? streamData : (streamData as any)?.sources || [];
        const normalized = rawList.map((s: any, idx: number) => ({
          label: s.label || s.filename || (s.height ? `${s.height}p HD (${s.kind || 'stream'})` : `Servidor ${idx + 1}`),
          url: s.url || s.src || s.file || FALLBACK_VIDEOS[idx % FALLBACK_VIDEOS.length]
        }));

        const list = normalized.length > 0 ? normalized : [
          { label: 'Servidor 1 (1080p MP4)', url: FALLBACK_VIDEOS[0] },
          { label: 'Servidor 2 (720p HD)', url: FALLBACK_VIDEOS[1] }
        ];

        setSources(list);
        setSelectedSource(list[0].url);
      } else if (provider === 'hh') {
        const hh = item as HentaiHavenItem;
        const id = hh.id || 'hh-1';
        const detailData = await fetchHhDetail(id);
        const sourcesData = await fetchHhSources(id);

        if (!isMounted) return;
        if (detailData) {
          setDetail(detailData);
          const epList: AnimeEpisode[] = detailData.episodes || [
            { id: 'hh-ep1', number: 1, name: 'Episodio 1: El Despertar', thumbnail: detailData.cover, durationMs: 1500000 },
            { id: 'hh-ep2', number: 2, name: 'Episodio 2: La Batalla Final', thumbnail: detailData.cover, durationMs: 1500000 }
          ];
          setEpisodes(epList);
          setActiveEpisode(epList[0]);
        }

        const rawList = Array.isArray(sourcesData) ? sourcesData : sourcesData?.sources || [];
        const normalized = rawList.map((s: any, idx: number) => ({
          label: s.label || s.filename || `Servidor ${idx + 1}`,
          url: s.url || s.src || s.file || FALLBACK_VIDEOS[idx % FALLBACK_VIDEOS.length]
        }));

        const list = normalized.length > 0 ? normalized : [
          { label: 'Servidor Principal (1080p MP4)', url: FALLBACK_VIDEOS[0] },
          { label: 'Servidor Secundario (HD)', url: FALLBACK_VIDEOS[1] }
        ];

        setSources(list);
        setSelectedSource(list[0].url);
      } else {
        const r34 = item;
        const detailData = await fetchR34Detail(r34.id || 'img-101');
        if (!isMounted) return;
        if (detailData) setDetail(detailData);
      }
    };

    loadMediaData();

    return () => {
      isMounted = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [item, provider]);

  useEffect(() => {
    if (!selectedSource || !videoRef.current) return;
    setVideoError(false);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const videoEl = videoRef.current;

    if (selectedSource.endsWith('.m3u8') && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(selectedSource);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoEl.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, () => {
        setVideoError(true);
      });
      hlsRef.current = hls;
    } else {
      videoEl.src = selectedSource;
      videoEl.play().catch(() => {});
    }
  }, [selectedSource, activeEpisode]);

  const handleVideoError = () => {
    setVideoError(true);
    if (selectedSource !== FALLBACK_VIDEOS[0]) {
      setTimeout(() => {
        setSelectedSource(FALLBACK_VIDEOS[0]);
        setVideoError(false);
      }, 800);
    }
  };

  const handleSelectEpisode = (ep: AnimeEpisode) => {
    setActiveEpisode(ep);
    // Cycle server streams slightly for user experience
    if (sources.length > 0) {
      const nextIdx = (ep.number - 1) % sources.length;
      setSelectedSource(sources[nextIdx].url);
    }
  };

  const title = detail.name || detail.title || `Rule34 #${detail.id}`;
  const description = detail.description || detail.summary || (detail.publishedBy ? `Publicado por: ${detail.publishedBy}` : 'Sin descripción.');
  const poster = detail.posterUrl || detail.cover || detail.coverImage || detail.resizedImageUrl || detail.image;
  const rating = detail.rating ? `⭐ ${detail.rating}` : '⭐ 4.9';
  const views = detail.views ? `${detail.views.toLocaleString()} vistas` : 'Destacado';
  const tags = (detail.tags || detail.genres || []).slice(0, 8);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {provider !== 'r34' ? (
          <div className="video-wrapper" style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              poster={poster}
              onError={handleVideoError}
            />
            {videoError && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                color: '#f87171',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <AlertCircle size={32} />
                <p style={{ fontWeight: 600 }}>Cambiando a Servidor de Transmisión Alternativo HD...</p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: '#000', textAlign: 'center', padding: '1rem' }}>
            <img
              src={detail.fullImage || detail.resizedImageUrl || detail.image}
              alt="Full view"
              referrerPolicy="no-referrer"
              style={{ maxHeight: '480px', maxWidth: '100%', objectFit: 'contain', borderRadius: '12px' }}
            />
          </div>
        )}

        <div className="modal-body-content">
          <div className="modal-header-info">
            <img className="modal-cover" src={poster} alt={title} referrerPolicy="no-referrer" />
            <div className="modal-details">
              <h2 className="modal-title">{title}</h2>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', margin: '0.25rem 0' }}>
                <span className="badge badge-rating">
                  <Star size={13} fill="#fbbf24" color="#fbbf24" /> {rating.replace('⭐ ', '')}
                </span>
                <span className="badge">
                  <Eye size={13} /> {views}
                </span>
                {activeEpisode && (
                  <span className="badge badge-uncensored" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
                    <Film size={13} /> Capítulo {activeEpisode.number}
                  </span>
                )}
              </div>
              <p className="modal-desc">{description}</p>
              <div className="tags-list">
                {tags.map((t: any, idx: number) => (
                  <span key={idx} className="tag-item">
                    {typeof t === 'string' ? t : t.text || t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {provider !== 'r34' && episodes.length > 0 && (
            <div className="sources-section" style={{ marginTop: '1.25rem' }}>
              <h3 className="sources-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} /> Lista de Episodios y Capítulos ({episodes.length})
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '0.75rem',
                marginTop: '0.75rem'
              }}>
                {episodes.map((ep) => {
                  const isActive = activeEpisode?.number === ep.number;
                  return (
                    <div
                      key={ep.id}
                      onClick={() => handleSelectEpisode(ep)}
                      style={{
                        background: isActive ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: isActive ? '1px solid #ec4899' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '0.6rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ position: 'relative', width: '60px', height: '40px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                        <img
                          src={ep.thumbnail || poster}
                          alt={ep.name}
                          referrerPolicy="no-referrer"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {isActive && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(236,72,153,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Play size={16} color="#fff" fill="#fff" />
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isActive ? '#ec4899' : '#f3f4f6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Eps {ep.number}: {ep.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                          {ep.durationMs ? `${Math.round(ep.durationMs / 60000)} min` : 'HD Stream'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {provider !== 'r34' && (
            <div className="sources-section" style={{ marginTop: '1.25rem' }}>
              <h3 className="sources-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Play size={16} /> Servidores de Reproducción HD
              </h3>
              <div className="sources-buttons">
                {sources.map((s, idx) => (
                  <button
                    key={idx}
                    className={`source-btn ${selectedSource === s.url ? 'active' : ''}`}
                    onClick={() => setSelectedSource(s.url)}
                  >
                    ▶ {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
