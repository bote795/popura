import test from 'ava';
import pageScrapper from '../../src/composers/page-scrapper';
import {authToken} from '../mock';

const instance = pageScrapper({authToken});

test('Can scrap an anime page', async t => {
	const anime = await instance.getAnime(14719);

	t.is(anime.title, 'JoJo no Kimyou na Bouken (TV)');
	t.truthy(anime.image);
});
