import test from 'ava';
import parseLink from '../../src/parsers/utils/parse-link';

const animeLinkTag = `<a href="/anime/20899/JoJo_no_Kimyou_na_Bouken__Stardust_Crusaders">JoJo no Kimyou na Bouken: Stardust Crusaders</a>`;
const mangaLinkTag = `<a href="/manga/1517/JoJo_no_Kimyou_na_Bouken_Part_1__Phantom_Blood">JoJo no Kimyou na Bouken Part 1: Phantom Blood</a>`;
const characterLinkTag = `<a href="/character/6356/Joseph_Joestar">Joestar, Joseph</a>`;
const producerLinkTag = `<a href="/anime/producer/287/David_Production" title="David Production">David Production</a>`;
const peopleLinkTag = `<a href="/people/15107/Tsuda_Naokatsu">Tsuda, Naokatsu</a>`;
const seasonLinkTag = `<a href="http://myanimelist.net/anime/season/2016/spring">Spring 2016</a>`;
const genreLinkTag = `<a href="/anime/genre/8/Drama" title="Drama">Drama</a>`;

test('Parse link tags in MAL', t => {
	t.deepEqual(parseLink(animeLinkTag), {
		type: 'anime',
		id: 20899,
		title: 'JoJo no Kimyou na Bouken: Stardust Crusaders',
	});

	t.deepEqual(parseLink(mangaLinkTag), {
		type: 'manga',
		id: 1517,
		title: 'JoJo no Kimyou na Bouken Part 1: Phantom Blood',
	});

	t.deepEqual(parseLink(characterLinkTag), {
		type: 'character',
		id: 6356,
		title: 'Joestar, Joseph',
	});

	t.deepEqual(parseLink(producerLinkTag), {
		type: 'producer',
		id: 287,
		title: 'David Production',
	});

	t.deepEqual(parseLink(peopleLinkTag), {
		type: 'people',
		id: 15107,
		title: 'Tsuda, Naokatsu',
	});

	t.deepEqual(parseLink(seasonLinkTag), {
		type: 'season',
		year: 2016,
		season: 'spring',
		title: 'Spring 2016',
	});

	t.deepEqual(parseLink(genreLinkTag), {
		type: 'genre',
		id: 8,
		title: 'Drama',
	});
});

test('Can pass raw URL', t => {
	t.deepEqual(parseLink('/anime/20899/JoJo_no_Kimyou_na_Bouken__Stardust_Crusaders'), {
		type: 'anime',
		id: 20899,
		title: 'JoJo no Kimyou na Bouken  Stardust Crusaders',
	});

	t.deepEqual(parseLink('/anime/season/2016/spring'), {
		type: 'season',
		year: 2016,
		season: 'spring',
		title: 'Spring 2016',
	});
});
