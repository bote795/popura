import cheerio from 'cheerio';

const isLinkTag = /^<a(.*)<\/a>/;
const commonRegex = /(anime|manga|producer|character|people|genre)\/(\d+)/;
const seasonRegex = /season\/(\d+)\/(winter|spring|summer|fall)/;
const matchTitleInsideLink = /(\d+)\/(.*)/;

/**
 * @example
 * parseLink(`<a href="/anime/20899/JoJo_no_Kimyou_na_Bouken__Stardust_Crusaders">JoJo no Kimyou na Bouken: Stardust Crusaders</a>`;)
 * {
 *	 type: 'anime',
 *	 id: 20899,
 *	 title: 'JoJo no Kimyou na Bouken: Stardust Crusaders',
 * }
 *
 * parseLink('/anime/season/2016/spring')
 * {
 *	 type: 'season',
 *	 year: 2016,
 *	 season: 'spring',
 *	 title: 'Spring 2016',
 * }
 *
 * @param  {str} str Link tag or RAW URL
 * @return {object|str} Link model or `str` if fail to parse
 */
export default function parseLink(str) {
	let href;
	let title;

	if (isLinkTag.test(str)) {
		const $a = cheerio.load(str)('a');
		href = $a.attr('href');
		title = $a.text();

		if (!href || !title) {
			return str;
		}
	// If it's not a link tag, it's a RAW URL
	} else {
		href = str;
	}

	if (commonRegex.test(href)) {
		// If it's a RAW URL, it not passes the `title`, we must define it
		if (!title) {
			title = href.match(matchTitleInsideLink)[2]
				.split('_').join(' ');
		}

		const [, type, id] = href.match(commonRegex);
		return {type, id: Number(id), title};
	} else if (seasonRegex.test(href)) {
		const [, year, season] = href.match(seasonRegex);

		if (!title) {
			title = `${season[0].toUpperCase()}${season.slice(1)} ${year}`;
		}

		return {type: 'season', year: Number(year), season, title};
	}

	return str;
}
