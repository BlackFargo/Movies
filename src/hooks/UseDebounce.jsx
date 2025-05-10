import { useState, useEffect } from 'react'

// debounce +
// block next page +
// затестить отдельный слайс с очищением
// загруженные фильмы
// abort Controller +
// Загрузка
// env
// улушченее слайсов

export default function UseDebounce(query) {
	const [debouncedQuery, setDebouncedQuery] = useState('')

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(query)
		}, 100)

		return () => clearTimeout(timeoutId)
	}, [query])
	return debouncedQuery
}
