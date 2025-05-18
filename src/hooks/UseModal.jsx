import { useEffect, useState } from 'react'

export function useModal() {
	const [isOpen, setIsOpen] = useState(false)
	const open = () => {
		setIsOpen(true)
	}
	const close = () => {
		setIsOpen(false)
	}
	const toggle = () => {
		setIsOpen(prev => !prev)
	}
	useEffect(() => {
		const handleEscape = e => {
			if (e.key == 'Escape') {
				close()
			}
		}
		document.addEventListener('keydown', handleEscape)
		return document.removeEventListener('keydown', handleEscape)
	}, [])

	// useEffect(() => {
	// 	if (isOpen) {
	// 		document.body.style.overflow = isOpen ? 'hidden' : 'auto'
	// 		return () => (document.body.style.overflow = 'auto')
	// 	}
	// }, [isOpen])

	return { isOpen, setIsOpen, open, close, toggle }
}
