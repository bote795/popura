import crawl from '../utils/crawl';
import animePageParser from '../parsers/anime-page';

export default function pageScrapper(state) {
	return {
		getAnime(id) {
			return crawl(state.authToken, `/anime/${id}`, animePageParser);
		},
	};
}
