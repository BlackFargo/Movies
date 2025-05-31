// Input.jsx

import s from './Input.module.scss'

export function Input({
	type = 'text',
	placeholder,
	disabled = false,
	className = '',
	style = {},
	...rest
}) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			disabled={disabled}
			className={`${s.my_input} ${className}`}
			style={style}
			{...rest}
		/>
	)
}
