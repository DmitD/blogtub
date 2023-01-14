import React from 'react'
import { Article } from '../article/article.component'

export const ArticleList: React.FC = () => {
	return (
		<div className='w-2/3'>
			<Article />
			<Article />
			<Article />
		</div>
	)
}