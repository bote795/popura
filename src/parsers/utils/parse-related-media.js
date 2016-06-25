import cheerio from 'cheerio';
import parseLink from './parse-link';
import camelCase from './camel-case';

export default function parseRelatedMedia() {
	return {
		selector: '.anime_detail_related_anime', // Same for manga. Fuck the logic
		how: 'html',
		convert: html => {
			const result = {};
			const $ = cheerio.load(html);

			// Each <tr> is a type of related media, like 'Adaptation', 'Sequel'
			// or 'Alternative Version'
			$('tr').each((_, tr) => {
				const tds = $(tr).find('td');

				// The first <td> contain it's name
				// Must camelCase it for ones like 'Alternative Version'
				const propName = camelCase(tds.eq(0)
					.text() // Ex.: 'Adaptation:'
					.toLowerCase() // 'adaptation:'
					.slice(0, -1)); // 'adaptation'

				// The second <tb> contains links to the medias
				result[propName] = tds.eq(1).find('a')
					.map((_, link) => parseLink($.html(link)))
					.get(); // Turn into an array
			});

			return result;
		},
	};
}
