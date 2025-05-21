import { useState, useEffect } from 'react'

// затестить отдельный слайс с очищением -
// загруженные фильмы -
// Валидация регистрации
// Загрузка -
// Пофиксить удаление аккаунта
// улушченее слайсов -
// сделать asyncthunk для страницы video для сохраненных фильмов
// страница favorites с фильтрами ()
// страница help
// прибить футер к низу
// анимация перехода
// fb функции (смена пароля, удаление аккаунта)
// удаление лайков
// общие количество лайков на фильме

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
