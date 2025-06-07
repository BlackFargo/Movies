import { useEffect, useState } from 'react'

export function useDebounce(query) {
	const [debounceQuery, setDebounceQuery] = useState()
	useEffect(() => {
		let timeout = setTimeout(() => {
			setDebounceQuery(query)
		}, 200)

		return () => clearTimeout(timeout)
	}, [query])
	return debounceQuery
}
