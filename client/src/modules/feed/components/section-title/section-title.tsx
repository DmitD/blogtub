import React from 'react'

interface SectionTitleProps {
	title: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
	return (
		<h4 className='flex items-center font-bold text-2xl text-theme-blue mb-rightTitleBottom'>
			<span>{title}</span>
			<span className='content-none bg-theme-green h-0.5 min-w-[30px] ml-3.5 flex-auto'></span>
		</h4>
	)
}
