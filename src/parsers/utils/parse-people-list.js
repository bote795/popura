import cheerio from 'cheerio';
import people from '../element/people';

/**
 * Parse 'Characters & Voice Actors' and 'Staff' sections
 *
 * @param  {string} start - Where to start parsing
 * @param  {string} until - Stop parsing before `until`
 * @param  {bool} isParsingChars - True if parsing `Characters & Voice Actors`
 * @return {array} - Array of character/people link models
 */
export default function parsePeopleList(start, until, isParsingChars) {
	return {
		selector: '.pb24',
		how: 'html',
		convert: html => {
			const area = html.match(new RegExp(`${start}([\\s\\S]*)${until}`))[1];
			const $ = cheerio.load(area);

			// 'Characters & Voice Actors' is a `table of tables` while
			// 'Staff' is a single table
			const selector = isParsingChars ?
				// You must be careful to not recursively select tables
				$.root().children('table').children('tr') :
				$('tr');

			return selector
				.map((_, node) => people(cheerio.load(node), isParsingChars))
				.get();
		},
	};
}
