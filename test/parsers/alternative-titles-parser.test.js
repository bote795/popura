import test from 'ava';
import alternativeTitlesParser from '../../src/parsers/utils/alternative-titles-parser';

const testSrt = `English: Re:ZERO -Starting Life in Another World-

Synonyms: Re: Life in a different world from zero, ReZero

Japanese: Re：ゼロから始める異世界生活`;

test('Can parse alternative titles', t => {
	t.deepEqual(alternativeTitlesParser(testSrt), {
		english: ['Re:ZERO -Starting Life in Another World-'],
		synonyms: ['Re: Life in a different world from zero', 'ReZero'],
		japanese: ['Re：ゼロから始める異世界生活'],
	});
});
