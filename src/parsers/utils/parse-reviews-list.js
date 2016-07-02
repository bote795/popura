import cheerio from 'cheerio';
import parseReview from '../element/review';

/**
 * Parse reviews from `start` to `end`
 *
 * @param  {string} start - Where to start parsing
 * @param  {string} until - Stop parsing before `until`
 * @return {array} - Array of reviews
 */
export default function parseReviewsList(start, until) {
	return {
		selector: '.pb24',
		how: 'html',
		convert: html => {
			const area = html.match(new RegExp(`${start}([\\s\\S]*)${until}`))[1];
			const $ = cheerio.load(area);

			return $('.borderDark')
				.map((_, review) => parseReview(cheerio.load(review)))
				.get();
		},
	};
}

