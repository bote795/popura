export default function camelCase(str) {
	return str
		.replace(/\s(.)/g, c => c.toUpperCase())
		.replace(/\s/g, '')
		.replace(/^(.)/, c => c.toLowerCase());
}
