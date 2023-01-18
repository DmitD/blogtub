import React from 'react'
import { FeedArticle } from '../../api/dto/global-feed.in'
import { Article } from '../article/article'

interface ArticleListProps {
	list: FeedArticle[]
}

export const ArticleList: React.FC<ArticleListProps> = ({ list }) => {
	return (
		<div className='max-w-[728px] min-w-[728px]'>
			{list.map(article => (
				<Article key={article.slug} {...article} />
			))}
		</div>
	)
}
