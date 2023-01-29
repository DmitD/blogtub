import React from 'react'
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

export const Social: React.FC = () => {
	return (
		<section className='text-theme-blue'>
			<h4 className='flex items-center font-bold text-2xl mb-rightTitleBottom'>
				<span>Social</span>
				<span className='content-none bg-theme-green h-0.5 min-w-[30px] ml-3.5 flex-auto'></span>
			</h4>
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
