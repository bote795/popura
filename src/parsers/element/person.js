import parseLink from '../utils/parse-link';

/**
 * @param {Cheerio Object} $
 * @param {bool} isChar - True if is parrsing a character. Needed since chars have seiyuus
 * @return {object}
 */
export default function parsePerson($, isChar) {
	const tds = $('td');

	const person = parseLink($.html(
		tds
			.eq(1)
			.find('a')
	));

	person.image = tds
		.eq(0)
		.find('img')
		.attr('data-src');

	person.role = tds
		.eq(1)
		.find('small')
		.text();

	// People can have more than one role
	if (!isChar) {
		person.role = person.role
			.split(',')
			.map(r => r.trim());
	}

	if (isChar) {
		const seiyuuTds = tds
			.eq(2)
			.find('td');

		person.seiyuu = parseLink($.html(
			seiyuuTds
				.eq(0)
				.find('a')
		));

		person.seiyuu.language = seiyuuTds
			.eq(0)
			.find('small')
			.text();

		person.seiyuu.image = seiyuuTds
			.eq(1)
			.find('img')
			.attr('data-src');
	}

	return person;
}

