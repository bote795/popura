/**
 * @param  {string} str
 * @return {bool}
 */
export default function emptyFilter(str) {
	return !/^\s*$/.test(str);
}
