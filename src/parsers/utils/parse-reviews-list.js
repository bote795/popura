import cheerio from 'cheerio';
import parseLink from './parse-link';

export default function parseReviewsList(start, until) {
	return {
		selector: '.pb24',
		how: 'html',
		convert: html => {
			const area = html.match(new RegExp(`${start}([\\s\\S]*)${until}`))[1];
			const $ = cheerio.load(area);

			return $('.borderDark')
				.map((_, review) => {
					const childDivs = $(review).children('div');
					const metaCols = childDivs
						.eq(0)
						.find('td');

					const user = parseLink($.html(
						metaCols
							.eq(1)
							.find('a')
							.eq(0)
					));
					user.image = metaCols
						.eq(0)
						.find('img')
						.attr('data-src');

					const useful = Number(
						metaCols
							.eq(1)
							.children('div')
							.eq(1)
							.find('span')
							.text()
					);

					const date = metaCols
						.eq(2)
						.find('div')
						.eq(0)
						.text();

					const [, seen, totalToSee] = metaCols
						.eq(2)
						.find('div')
						.eq(1)
						.text()
						.match(/(\d+) of (\d+)/);

					const rating = childDivs
						.eq(1)
						.find('tr')
						.map((_, rateTr) => {
							const rateTds = $(rateTr).find('td');

							const type = rateTds
								.eq(0)
								.text()
								.toLowerCase();

							const value = Number(
								rateTds
									.eq(1)
									.text()
							);

							return {type, value};
						})
						.get()
						.reduce((acc, curr) => {
							acc[curr.type] = curr.value;
							return acc;
						}, {});

					const textDiv = childDivs.eq(1);
					textDiv.find('div').remove();
					textDiv.find('a').remove();
					const text = textDiv.text();

					return {
						user,
						useful,
						rating,
						date,
						text,
						seen: {
							current: seen,
							total: totalToSee,
						},
					};
				})
				.get();
		},
	};
}

