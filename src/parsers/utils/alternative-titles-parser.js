import emptyFilter from './empty-filter';

/**
 * @example
 * English: Re:ZERO -Starting Life in Another World-
 *
 * Synonyms: Re: Life in a different world from zero, ReZero
 *
 * Japanese: Re：ゼロから始める異世界生活
 *
 * @returns
 * {
 *  english: 'Re:ZERO -Starting Life in Another World-',
 *  synonyms: 'Re: Life in a different world from zero, ReZero',
 *  japanese: 'Re：ゼロから始める異世界生活',
 * }
 */
export default function alternativeTitlesParser(field) {
	const result = {};

	const cleanFields = field
		.split('\n')
		.filter(emptyFilter)
		.map(value => value.trim());

	for (let item of cleanFields) {
		const [, type, value] = item.match(/([a-zA-Z]+): (.*)/);
		result[type.toLowerCase()] = value.split(', ');
	}

	return result;
}
