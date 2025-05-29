import { useState, useEffect } from 'react'

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
