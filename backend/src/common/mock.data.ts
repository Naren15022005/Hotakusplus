import { SearchResult } from '../hanime/interfaces/search-result.interface';
import { Video } from '../hanime/interfaces/video.interface';
import { Stream } from '../hanime/interfaces/stream.interface';
import { HentaiSearchResult } from '../hentai-haven/interfaces/hentai-search-result.interface';
import { HentaiInfo } from '../hentai-haven/interfaces/hentai-info.interface';
import { HentaiSourcesResponse } from '../hentai-haven/interfaces/hentai-source.interface';
import { AutocompleteItem } from '../rule34/interfaces/autocomplete-item.interface';
import { PaginatedResult } from '../rule34/interfaces/paginated-result.interface';
import { ImageInfo } from '../rule34/interfaces/image-info.interface';

export const MOCK = {
  hanimeSearch: [
    { id: 1, name: 'Categorias Example', slug: 'categorias-example', titles: ['Categorias', 'Categories'], description: 'Sample anime about categories', views: 125000, bannerImage: 'https://via.placeholder.com/800x200', coverImage: 'https://via.placeholder.com/300x450', brand: { name: 'Studio X', id: 1 }, durationMs: 1800000, isCensored: false, likes: 4500, rating: 4.5, dislikes: 120, downloads: 89000, rankMonthly: 15, tags: ['categorias', 'sample'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  ] as SearchResult[],
  hanimeDetail: {
    title: 'Categorias Example', slug: 'categorias-example', id: 1, description: 'Full anime description about categories', views: 125000, posterUrl: 'https://via.placeholder.com/300x450', coverUrl: 'https://via.placeholder.com/800x200', brand: { name: 'Studio X', id: 1 }, durationMs: 1800000, isCensored: false, likes: 4500, rating: 4.5, tags: [{ id: 1, text: 'categorias' }, { id: 2, text: 'sample' }], episodes: { next: null, all: [{ id: 1, slug: 'ep-1', number: 1, season: 1, name: 'Episode 1', description: 'First episode', durationMs: 1800000, isCensored: false, isSubbed: true, isDubbed: false, thumbnail: 'https://via.placeholder.com/300x170', releasedAt: 1700000000000 }], random: null },
  } as Video,
  hanimeStreams: [
    { id: 1, serverId: 1, kind: 'hls', extension: 'm3u8', mimeType: 'application/x-mpegURL', width: 1920, height: 1080, durationInMs: 1800000, filesizeMbs: 450, filename: 'sample_1080p.m3u8', url: 'https://example.com/stream/sample.m3u8' },
  ] as Stream[],
  hhSearch: [
    { id: 'hh-1', title: 'Categorias Hentai', cover: 'https://via.placeholder.com/300x450', rating: 4.2, released: 2024, genres: [{ id: 'g1', url: '/genre/categorias', name: 'Categories' }], totalEpisodes: 3, alternative: 'Categories Alt', author: 'Author Name' },
  ] as HentaiSearchResult[],
  hhDetail: {
    id: 'hh-1', title: 'Categorias Hentai', cover: 'https://via.placeholder.com/300x450', summary: 'Detailed summary about categories', views: 50000, ratingCount: 1200, released: 2024, genres: [{ id: 'g1', url: '/genre/categorias', name: 'Categories' }], totalEpisodes: 3, episodes: [{ id: 'ep-1', title: 'Episode 1', thumbnail: 'https://via.placeholder.com/300x170', number: 1, releasedUTC: '2024-01-01T00:00:00Z', releasedRelative: '1 year ago' }],
  } as HentaiInfo,
  hhSources: { sources: [{ label: '1080p', src: 'https://example.com/video.mp4', type: 'video/mp4' }], thumbnail: 'https://via.placeholder.com/300x170' } as HentaiSourcesResponse,
  r34Autocomplete: [
    { label: 'categorias', value: 'categorias', count: 1500 },
    { label: 'category', value: 'category', count: 3200 },
  ] as AutocompleteItem[],
  r34Search: { results: [{ id: 'img-1', image: 'https://via.placeholder.com/250x250', tags: ['categorias', 'sample'], type: 'preview' }], total: 1, page: 1, pages: 1, next: 1, previous: 1, hasNextPage: false } as PaginatedResult,
  r34Detail: { id: 'img-1', fullImage: 'https://via.placeholder.com/800x800', resizedImageUrl: 'https://via.placeholder.com/400x400', tags: ['categorias', 'sample', 'demo'], createdAt: 1700000000000, publishedBy: 'artist123', rating: 'safe', sizes: { original: { aspect: '1:1', width: 800, height: 800 } }, comments: [{ id: 'c1', user: 'user1', comment: 'Great image!' }] } as ImageInfo,
};
