import React, { ComponentProps } from 'react'
import clsx from 'clsx'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

enum InputStyle {
	HALF = 'HALF',
	WHOLE = 'WHOLE',
}

enum InputSize {
	BASE = 'BASE',
	SM = 'SM',
}

interface InputProps {
	name: ComponentProps<'input'>['name']
	placeholder: ComponentProps<'input'>['placeholder']
	type?: ComponentProps<'input'>['type']
	onChange: ComponentProps<'input'>['onChange']
	onBlur: ComponentProps<'input'>['onBlur']
	half?: boolean
	inputStyle?: keyof typeof InputStyle
	inputSize?: keyof typeof InputSize
	handleShowPassword?: () => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			name,
			placeholder,
			type,
			half,
			handleShowPassword,
			inputStyle,
			inputSize = InputSize.BASE,
			...inputProps
		},
		ref
	) => {
		const styleClasses = clsx({
			'col-span-2 relative': inputStyle === InputStyle.WHOLE,
			'col-span-2 relative sm:col-span-1': inputStyle === InputStyle.HALF,
		})
		const inputClasses = clsx('border border-theme-blue/10 rounded w-full', {
			'px-3.5 py-4': inputSize === InputSize.BASE,
			'px-1 py-2 text-sm': inputSize === InputSize.SM,
		})

		return (
			<div className={styleClasses}>
				<label htmlFor={name} />
				<input
					ref={ref}
					id={name}
					name={name}
					placeholder={placeholder}
					type={type}
					{...inputProps}
					className={inputClasses}
				/>
				{name === 'password' ? (
					<button
						onClick={handleShowPassword}
						className='text-2xl absolute top-1/2 -translate-y-1/2 right-6 text-theme-lightGray'
						type='button'
					>
						{type === 'password' ? <FaEye /> : <FaEyeSlash />}
					</button>
				) : undefined}
			</div>
		)
	}
)
