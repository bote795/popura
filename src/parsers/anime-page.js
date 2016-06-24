import alternativeTitlesParser from './utils/alternative-titles-parser';

const animePageParser = {
	title: 'h1',

	synopsis: '[itemprop=description]',

	image: {
		selector: '.js-scrollfix-bottom img',
		attr: 'data-src',
	},

	alternativeTitles: {
		selector: '#content .borderClass .js-scrollfix-bottom > .spaceit_pad',
		convert: alternativeTitlesParser,
	},
};

export default animePageParser;
