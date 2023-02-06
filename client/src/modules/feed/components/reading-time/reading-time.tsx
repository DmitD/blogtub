import React from 'react'
import { IoMdRemove } from 'react-icons/io'

interface ReadingTimeProps {
	article: string
}

export const ReadingTime: React.FC<ReadingTimeProps> = ({ article }) => {
	const wpm = 225
	const words = article.trim().split(/\s+/).length
	const time = Math.ceil(words / wpm)

	return (
		<>
			<span className='mr-4'>
				<IoMdRemove className='inline-block h-5 w-5 text-theme-green align-middle mb-0.5' />
				&nbsp;
				<span id='time'>{time} min read</span>
			</span>
		</>
	)
}
