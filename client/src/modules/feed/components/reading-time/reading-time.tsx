import React from 'react'
import { IoMdRemove } from 'react-icons/io'

export const ReadingTime: React.FC = () => {
	return (
		<>
			<span className='mr-4'>
				<IoMdRemove className='inline-block h-5 w-5 text-theme-green align-middle mb-0.5' />
				&nbsp;
				<span id='time'>2</span> min read
			</span>
		</>
	)
}
