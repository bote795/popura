import parseLink from '../utils/parse-link';

/**
 * @param {Cheerio Object} $
 * @return {object}
 */
export default function parseReview($) {
	const childDivs = $.root().children('div');
	const metaCols = childDivs
		.eq(0)
		.find('td');

	const review = {};

	review.user = parseLink($.html(
		metaCols
			.eq(1)
			.find('a')
			.eq(0)
	));
	review.user.image = metaCols
		.eq(0)
		.find('img')
		.attr('data-src');

	review.useful = Number(
		metaCols
			.eq(1)
			.children('div')
			.eq(1)
			.find('span')
			.text()
	);

	review.date = metaCols
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

	review.seen = {
		current: seen,
		total: totalToSee,
	};

	review.rating = childDivs
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
	review.text = textDiv.text();

	return review;
}

