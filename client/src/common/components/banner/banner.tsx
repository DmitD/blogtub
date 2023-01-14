import React from 'react'
import { Container } from '../container/container'

export const Banner: React.FC = () => {
	return (
		<div className='bg-theme-blue shadow-banner text-white p-8 mb-8'>
			<Container>
				<h1 className='font-josefin drop-shadow-banner text-center text-banner pb-2'>
					Blogtub
				</h1>
				<p className='text-center text-2xl font-light'>
					Personal Website Blog & News
				</p>
			</Container>
		</div>
	)
}
