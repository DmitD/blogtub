import React from 'react'
import { Container } from '../container/container'

export const Banner: React.FC = () => {
	return (
		<div className='text-white bg-theme-blue shadow-banner p-8 mb-8'>
			<Container>
				<h1 className='text-center text-56px drop-shadow-banner pb-2'>
					Blogtub
				</h1>
				<p className='text-center font-source text-2xl font-light'>
					Personal Website Blog & News
				</p>
			</Container>
		</div>
	)
}
