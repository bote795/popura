import parseLink from '../utils/parse-link';

/**
 * @param {Cheerio Object} $
 * @param {bool} isChar - True if is parrsing a character. Needed since chars have seiyuus
 * @return {object}
 */
export default function parsePeople($, isChar) {
	const tds = $('td');

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

	// People can have more than one role
	if (!isChar) {
		role = role
			.split(',')
			.map(r => r.trim());
	}

	// Things merge with the link model
	const addToModel = {image, role};

	if (isChar) {
		const seiyuuTds = tds
			.eq(2)
			.find('td');

		const link = parseLink($.html(
			seiyuuTds
				.eq(0)
				.find('a')
		));

		const language = seiyuuTds
			.eq(0)
			.find('small')
			.text();

		const image = seiyuuTds
			.eq(1)
			.find('img')
			.attr('data-src');

		addToModel.seiyuu = Object.assign(link, {language, image});
	}

	return Object.assign(link, addToModel);
}

