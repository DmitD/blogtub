import React, { ComponentProps } from 'react'
import clsx from 'clsx'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

enum AuthInputStyle {
	HALF = 'HALF',
	WHOLE = 'WHOLE',
}

interface AuthInputProps {
	name: ComponentProps<'input'>['name']
	placeholder: ComponentProps<'input'>['placeholder']
	type?: ComponentProps<'input'>['type']
	onChange: ComponentProps<'input'>['onChange']
	onBlur: ComponentProps<'input'>['onBlur']
	half?: boolean
	authInputStyle?: keyof typeof AuthInputStyle
	handleShowPassword?: () => void
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
	(
		{
			name,
			placeholder,
			type,
			half,
			handleShowPassword,
			authInputStyle = AuthInputStyle.WHOLE,
			...inputProps
		},
		ref
	) => {
		const inputClasses = clsx('col-span-2 relative', {
			'sm:col-span-1': authInputStyle === AuthInputStyle.HALF,
		})

		return (
			<div className={inputClasses}>
				<label htmlFor={name} />
				<input
					ref={ref}
					id={name}
					name={name}
					placeholder={placeholder}
					type={type}
					{...inputProps}
					className='border border-theme-blue/10 rounded px-3.5 py-4 w-full'
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
