import React from 'react'
import { FieldErrorsImpl } from 'react-hook-form'
import clsx from 'clsx'

enum ErrorStyle {
	AUTH = 'AUTH',
	EDITOR = 'EDITOR',
}

interface ErrorsListProps {
	errors: Partial<FieldErrorsImpl<any>>
	errorStyle?: keyof typeof ErrorStyle
}

export const ErrorsList: React.FC<ErrorsListProps> = ({
	errors,
	errorStyle = ErrorStyle.EDITOR,
}) => {
	const styleClasses = clsx('list-disc pl-5', {
		'col-span-2': errorStyle === ErrorStyle.AUTH,
	})

	return (
		<ul className={styleClasses}>
			{(Object.keys(errors) as (keyof typeof errors)[]).map(field => (
				<li key={`error-${String(field)}`} className='text-theme-red'>
					{errors[String(field)]!.message as string}
				</li>
			))}
		</ul>
	)
}
