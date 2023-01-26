import React from 'react'
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

export const Social: React.FC = () => {
	return (
		<section className='font-josefin text-theme-blue'>
			<h4 className='font-bold text-2xl mb-titleBottom flex items-center'>
				<span>Social</span>
				<span className='h-0.5 min-w-[30px] ml-3.5 content-none bg-theme-green flex-auto'></span>
			</h4>
			<div className='flex justify-between text-social'>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='w-16 h-[68px] bg-social-twitter flex items-center justify-center'
				>
					<FaTwitter className='text-white m-0' />
				</a>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='w-16 h-[68px] bg-social-facebook flex items-center justify-center'
				>
					<FaFacebookF className='text-white m-0' />
				</a>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='w-16 h-[68px] bg-social-inst flex items-center justify-center'
				>
					<FaInstagram className='text-white m-0' />
				</a>
				<a
					href='https://twitter.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='w-16 h-[68px] bg-social-youtube flex items-center justify-center'
				>
					<FaYoutube className='text-white m-0' />
				</a>
			</div>
		</section>
	)
}
