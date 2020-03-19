export default function dateFilter(value) {
	const date = new Date(value);
	return date.toLocaleDateString('ru', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}
