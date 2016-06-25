import parseSidebarData from './utils/parse-sidebar-data';
import parseRelatedMedia from './utils/parse-related-media';

const animePageParser = {
	title: 'h1',

	synopsis: '[itemprop=description]',

	image: {
		selector: '.js-scrollfix-bottom img',
		attr: 'data-src',
	},

	alternativeTitles: parseSidebarData('Alternative Titles', 'Information'),

	information: parseSidebarData('Information', 'Statistics'),

	statistics: parseSidebarData('Statistics', 'google'),

	related: parseRelatedMedia(),
};

export default animePageParser;
