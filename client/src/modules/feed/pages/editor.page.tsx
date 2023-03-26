import React from 'react'
import { toast } from 'react-toastify'
import { PostForm } from '../components/post-form/post-form'
import { Container } from '../../../common/components/container/container'
import { useCreateArticleMutation } from '../api/repository'
import { PostFormValues } from '../types'
import { useNavigate } from 'react-router-dom'

export const EditorPage: React.FC = () => {
	const navigate = useNavigate()
	const [triggerCreateArticle] = useCreateArticleMutation()

	const onSubmit = async (values: PostFormValues) => {
		try {
			const data = await triggerCreateArticle(values).unwrap()
			navigate(`/article/${data.article.slug}`)
		} catch (e) {
			toast.error('Something went wrong. Please, try again.')
		}
	}

	return (
		<Container>
			<PostForm onSubmit={onSubmit} />
		</Container>
	)
}
