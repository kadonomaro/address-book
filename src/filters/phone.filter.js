export default function phoneFilter(value) {
	return value.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4-$5");
}
