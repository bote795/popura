import cheerio from 'cheerio';
import parseLink from './parse-link';

/**
 * Parse 'Characters & Voice Actors' and 'Staff' sections
 *
 * @param  {type} start - Where to start parsing
 * @param  {type} until - Stop parsing before `until`
 * @param  {type} isParsingChars - True if parsing `Characters & Voice Actors`
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
				.map((_, tr) => {
					const tds = $(tr).find('td');

					const image = tds
						.eq(0)
						.find('img')
						.attr('data-src');

					const link = parseLink($.html(
						tds
							.eq(1)
							.find('a')
					));

					let role = tds
						.eq(1)
						.find('small')
						.text();

					// 'People can have more than one role'
					if (!isParsingChars) {
						role = role
							.split(',')
							.map(r => r.trim());
					}

					// Things merge with the link model
					const addToModel = {image, role};

					if (isParsingChars) {
						const seiyuuTds = tds.eq(2).find('td');

						const link = parseLink($.html(seiyuuTds.eq(0).find('a')));
						const language = seiyuuTds.eq(0).find('small').text();
						const image = seiyuuTds.eq(1).find('img').attr('data-src');

						addToModel.seiyuu = Object.assign(link, {language, image});
					}

					return Object.assign(link, addToModel);
				})
				.get();
		},
	};
}
