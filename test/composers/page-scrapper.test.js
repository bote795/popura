import test from 'ava';
import pageScrapper from '../../src/composers/page-scrapper';
import {authToken} from '../mock';

const instance = pageScrapper({authToken});

test('Can scrap an anime page', async t => {
	const anime = await instance.getAnime(14719);
	t.is(anime.title, 'JoJo no Kimyou na Bouken (TV)');
	t.truthy(anime.image);
});

test('Can scrap a manga page', async t => {
	const manga = await instance.getManga(1517);
	console.log(manga.information);
	t.is(manga.title, 'JoJo no Kimyou na Bouken Part 1: Phantom Blood');
	t.truthy(manga.image);
});

