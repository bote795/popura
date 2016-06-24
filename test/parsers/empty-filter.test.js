import test from 'ava';
import emptyFilter from '../../src/parsers/utils/empty-filter';

test('Filter only empty values', t => {
	t.false(emptyFilter(''));
	t.false(emptyFilter('   '));
	t.true(emptyFilter('   . '));
});

test('Can filter empty values from an array', t => {
	t.deepEqual([
		'foo',
		'bar',
		'  ',
		'',
		' .',
	].filter(emptyFilter), [
		'foo',
		'bar',
		' .',
	]);
});
