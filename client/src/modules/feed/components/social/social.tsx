import React from 'react'
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { SectionTitle } from '../section-title/section-title'

export const Social: React.FC = () => {
	return (
		<section>
			<SectionTitle title='Section' />
			<div className='flex justify-between text-25px'>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center w-16 h-[68px] bg-social-twitter'
				>
					<FaTwitter className='text-white m-0' />
				</a>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center w-16 h-[68px] bg-social-facebook'
				>
					<FaFacebookF className='text-white m-0' />
				</a>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center w-16 h-[68px] bg-social-inst'
				>
					<FaInstagram className='text-white m-0' />
				</a>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center w-16 h-[68px] bg-social-youtube'
				>
					<FaYoutube className='text-white m-0' />
				</a>
			</div>
		</section>
	)
}
