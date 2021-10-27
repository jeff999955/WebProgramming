/**
 * Randomshuffle a given array, and return the result
 * @param {Array} origin The array needed to shuffle.
 * @param {Number} max_count Null to return whole array, or length to slice.
 */
const randomShuffle = (origin, max_count) => {
	if (!max_count) max_count = origin.length;
	return origin
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value)
		.slice(0, max_count);
};

export { randomShuffle };
