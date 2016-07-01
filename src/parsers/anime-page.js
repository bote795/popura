import parseSidebarData from './utils/parse-sidebar-data';
import parseRelatedMedia from './utils/parse-related-media';
import parsePeopleList from './utils/parse-people-list';
import parseReviewsList from './utils/parse-reviews-list';
import parseRecommendationsSlides from './utils/parse-recommendations-slides';

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

	characters: parsePeopleList('Voice Actors', 'Staff', true),

	staff: parsePeopleList('Staff', 'Opening Theme'),

	reviews: parseReviewsList('Reviews', 'Recommendations'),

	recommendations: parseRecommendationsSlides(),
};

export default animePageParser;
