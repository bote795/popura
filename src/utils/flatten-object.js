/**
 * @module utils/flattenObject
 * @description Flatten XML parsed objects containing one
 * element arrays as values
 *
 * @example
 * flattenObject({a: [1], b: [2]});
 * {a: 1, b: 2}
 *
 * flattenObject({username: ['lubien']});
 * {username: 'lubien'}
 *
 * @param  {object} obj - An object whose key's values are one element arrays
 * @return {object} - Flattened object
 */
export default function flattenObject(obj) {
	const newObj = {};

	for (const key of Object.keys(obj)) {
		newObj[key] = obj[key][0];
	}

	return newObj;
}