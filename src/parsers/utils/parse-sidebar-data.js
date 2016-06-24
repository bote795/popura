import cheerio from 'cheerio';
import emptyFilter from './empty-filter';
import parseLink from './parse-link';

export default function parseSidebarData(start, until) {
	return {
		selector: '#content .borderClass .js-scrollfix-bottom',
		how: 'html',
		convert: text => {
			const result = {};

			// Match, separate, remove empty and trim lines
			const lines = text
				.match(new RegExp(`${start}([\\s\\S]*)${until}`))[1]
				.split('\n')
				.filter(emptyFilter)
				.map(line => line.trim());

			for (let [index, line] of lines.entries()) {
				// Try to match `Something:`
				const matchedName = line.match(/>(\w+):</);
				const propName = Array.isArray(matchedName) ?
					matchedName[1].toLowerCase() : // Matched! Return it lowercased
					false; // No match

				// Some props have it's value inline
				if (propName && isOneLiner(line)) {
					// Some values are inside an `a` html tag
					const value = cheerio.load(line)('a').text() ||
						// Some others are right after `</span>` tag
						line.split('</span>')[1].trim();
					result[propName] = applyValueModifiers(propName, value, result);
				} else if (propName) {
					// If it's value is not inline, it's in the next line
					result[propName] = applyValueModifiers(propName, lines[index + 1], result);
				}
			}

			return result;
		},
	};
}

function isOneLiner(line) {
	for (let oneLiner of ['English', 'Synonyms', 'Japanese', 'Type']) {
		if (line.includes(`${oneLiner}:`)) {
			return true;
		}
	}
	return false;
}

function maybeSplit(propName, value) {
	if ([
		'english', 'synonyms', 'japanese', 'producers', 'licensors', 'genres',
	].indexOf(propName) === -1) {
		return value;
	}
	const splitted = value.split(',').map(v => v.trim());

	if (splitted[0] === 'None found') {
		return [];
	}

	return splitted;
}

function specialParsers(propName, value, result) {
	const specialParsers = {
		premieredParser, scoreParser, rankedParser, popularityParser, genresParser,
	};
	if (specialParsers[`${propName}Parser`]) {
		return specialParsers[`${propName}Parser`](value, result);
	}
	return value;
}

function numericField(propName, value) {
	if ([
		'ratingCount', 'score', 'episodes', 'ranked', 'popularity',
		'members', 'favorites',
	].indexOf(propName) === -1) {
		return value;
	}

	// String('123,456') -> Number(123456)
	return Number(value.split(',').join(''));
}

function applyValueModifiers(propName, value, result) {
	let currentValue = value;
	for (let modifier of [
		maybeSplit,
		specialParsers,
		numericField,
	]) {
		currentValue = modifier(propName, currentValue, result);
	}
	return currentValue;
}

/* Special Parsers */

/**
 * @example
 * premieredParser('<a href="http://myanimelist.net/anime/season/2016/spring">Spring 2016</a>')
 * @return Season link model
 * @see ./parse-link
 */
function premieredParser(value) {
	return parseLink(value);
}

/**
 * @example
 * scoreParser('<span itemprop="ratingValue">8.70</span><sup>1</sup> (scored by <span itemprop="ratingCount">43,785</span> users)')
 * '8.7'
 * @see This `value` also contains MAL's `ratingCount`
 */
function scoreParser(value, result) {
	const $ = cheerio.load(value);
	// We have two props here. Add it to `result`
	result.ratingCount = Number($('[itemprop=ratingCount]').text().split(',').join(''));
	return $('[itemprop=ratingValue]').text();
}

/**
 * @example
 * rankedParser('#40<sup>2</sup>')
 * '40'
 */
function rankedParser(value) {
	return value.match(/^#(\d+)/)[1];
}

/**
 * @example
 * popularityParser('#40')
 * '40'
 */
function popularityParser(value) {
	return rankedParser(value);
}

/**
 * @example
 * genresParser(['<a href="/anime/genre/8/Drama" title="Drama">Drama</a>'])
 * @return List of genre link models
 * @see ./parse-link
 */
function genresParser(value) {
	return value.map(parseLink);
}
