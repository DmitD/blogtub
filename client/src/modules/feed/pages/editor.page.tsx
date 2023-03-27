import React from 'react'
import { toast } from 'react-toastify'
import { PostForm } from '../components/post-form/post-form'
import { Container } from '../../../common/components/container/container'
import {
	useCreateArticleMutation,
	useGetArticleQuery,
	useEditArticleMutation,
} from '../api/repository'
import { PostFormValues } from '../types'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateArticleInDTO } from '../api/dto/create-article.in'
import { EditArticleInDTO } from '../api/dto/edit-article.in'

export const EditorPage: React.FC = () => {
	const navigate = useNavigate()
	const [triggerCreateArticle] = useCreateArticleMutation()
	const [triggerEditArticle] = useEditArticleMutation()

	const { slug } = useParams()
	const { data, isLoading } = useGetArticleQuery(
		{ slug: String(slug) },
		{ skip: !Boolean(slug) }
	)

	const onSubmit = async (values: PostFormValues) => {
		try {
			let data: CreateArticleInDTO | EditArticleInDTO
			if (slug) {
				data = await triggerEditArticle({ ...values, slug }).unwrap()
			} else {
				data = await triggerCreateArticle(values).unwrap()
			}
			navigate(`/article/${data.article.slug}`)
		} catch (e) {
			toast.error('Something went wrong. Please, try again.')
		}
	}

	if (slug && isLoading) {
		return <p>Loading...</p>
	}

	return (
		<Container>
			<PostForm data={data} onSubmit={onSubmit} />
		</Container>
	)
}
