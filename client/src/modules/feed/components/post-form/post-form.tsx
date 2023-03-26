import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../../../common/components/button/button'
import { Input } from '../../../../common/components/input/input'
import { MDEditorHookForm } from '../mdeditor-hook-form/mdeditor-hook-form'
import { CreateArticleInDTO } from '../../api/dto/create-article.in'
import { PostFormValues } from '../../types'
import { ErrorsList } from '../../../../common/components/errors-list/errors-list'

interface PostFormProps {
	onSubmit: (values: PostFormValues) => Promise<void>
	data?: CreateArticleInDTO
}

const validationSchema = Yup.object({
	title: Yup.string()
		.required('title is required')
		.max(50, 'title must be less than 50 characters'),
	body: Yup.string().required(`body can't be blank`),
	tags: Yup.string()
		.default('')
		.max(30, 'title must be less than 30 characters'),
})

export const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<PostFormValues>({
		defaultValues: {
			title: '',
			body: '',
			tags: '',
		},
		resolver: yupResolver(validationSchema),
	})

	return (
		<form
			className='flex flex-col gap-8 mt-8 px-4 py-6 rounded bg-white shadow-articlePage'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input placeholder='Article title' {...register('title')} />
			<MDEditorHookForm name='body' control={control} />
			<Input placeholder='Enter tags' inputSize='SM' {...register('tags')} />
			<ErrorsList errors={errors} />
			<div className='flex justify-end'>
				<Button type='submit' buttonStyle='AUTH' disabled={isSubmitting}>
					Publish Article
				</Button>
			</div>
		</form>
	)
}
