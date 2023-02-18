import React, { ComponentProps, PropsWithChildren } from 'react'
import clsx from 'clsx'

enum ButtonStyle {
	FOLLOW = 'FOLLOW',
	AUTH = 'AUTH',
}

interface ButtonProps {
	type?: ComponentProps<'button'>['type']
	disabled?: ComponentProps<'button'>['disabled']
	buttonStyle?: keyof typeof ButtonStyle
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
	children,
	buttonStyle = ButtonStyle.FOLLOW,
	...buttonProps
}) => {
	const buttonClasses = clsx(
		'text-white text-center select-none whitespace-nowrap pb-1.5 pt-2.5 px-5 rounded-lg bg-theme-green border border-theme-green hover:bg-theme-darkGreen hover:border-theme-darkGreen active:bg-theme-green/80 active:border-theme-green/80',
		{ 'col-span-2': buttonStyle === ButtonStyle.AUTH }
	)
	return (
		<button className={buttonClasses} {...buttonProps}>
			{children}
		</button>
	)
}
