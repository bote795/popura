import test from 'ava';
import crawl from '../../src/utils/crawl';
import {authToken} from '../mock';

test('Can crawl pages', async t => {
	const result = await crawl(authToken, '/', {
		title: 'h1',
	});

	t.deepEqual(result, {title: 'Welcome to MyAnimeList.net!'});
});
