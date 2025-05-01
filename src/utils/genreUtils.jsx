export const genreIdByName = (genreName, obj) => {
	const generId = Object.keys(obj).find(key => obj[key] === genreName)
	return generId
}
