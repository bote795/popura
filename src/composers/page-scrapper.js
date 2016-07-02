import crawl from '../utils/crawl';
import animePageParser from '../parsers/anime-page';
import mangaPageParser from '../parsers/manga-page';

export default function pageScrapper(state) {
	return {
		getAnime(id) {
			return crawl(state.authToken, `/anime/${id}`, animePageParser);
		},

		getManga(id) {
			return crawl(state.authToken, `/manga/${id}`, mangaPageParser);
		},
	};
}
