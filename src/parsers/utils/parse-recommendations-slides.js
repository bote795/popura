/**
 * @param {string} type - `anime` or `manga`
 * @return {object}
 */
export default function ParseRecommendationsSlides(type = 'anime') {
	return {
		listItem: `#${type}_recommendation li`,
		data: {
			id: {
				selector: 'a',
				eq: 0,
				attr: 'href',
				convert: url => Number(url.match(/(\d+)-(\d+)/)[1]),
			},
			tile: '.title',
			image: {
				selector: 'img',
				attr: 'data-src',
			},
			users: {
				selector: '.users',
				how: 'text',
				convert: text => Number(text.match(/(\d+)/)[1]),
			},
		},
	};
}

