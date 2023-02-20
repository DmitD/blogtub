import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Container } from '../../../common/components/container/container'
import { AuthInput } from '../components/auth-input'
import { Button } from '../../../common/components/button/button'
import { useAuth } from '../hooks/use-auth'

interface SignInFormValues {
	email: string
	password: string
}

const validationSchema = Yup.object({
	email: Yup.string()
		.required('email is required')
		.email('email is must be a valid email address'),
	password: Yup.string().required().min(6),
})

export const SignInPage: React.FC = () => {
	const [showPassword, setShowPassword] = React.useState(false)
	const handleShowPassword = () => setShowPassword(!showPassword)

	const { signIn } = useAuth()

	const { register, handleSubmit, formState } = useForm<SignInFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(validationSchema),
	})

	const navigate = useNavigate()

	const onSubmit = async (values: SignInFormValues) => {
		try {
			await signIn(values)
			navigate('/')
		} catch (e) {
			toast.error('Something went wrong. Please, try again.')
		}
	}

	console.log('=== formState sign-in.page.tsx [54] ===', formState)

	return (
		<Container>
			<div className='max-w-md mx-auto mt-8 px-4 py-6 rounded bg-white shadow-articlePage'>
				<h5 className='text-2xl text-center mb-2'>Sign Ip</h5>
				<p className='font-source text-center mb-4'>
					<Link
						to='/sign-up'
						className='text-theme-green hover:text-theme-darkGreen'
					>
						Need an account?
					</Link>
				</p>
				<form
					className='grid grid-cols-2 gap-4'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<AuthInput placeholder='Email*' type='email' {...register('email')} />
					<AuthInput
						placeholder='Password*'
						type={showPassword ? 'text' : 'password'}
						handleShowPassword={handleShowPassword}
						{...register('password')}
					/>
					<ul className='col-span-2 list-disc pl-5'>
						{(
							Object.keys(formState.errors) as (keyof typeof formState.errors)[]
						).map(field => (
							<li key={`error-${field}`} className='text-theme-red'>
								{formState.errors[field]!.message}
							</li>
						))}
					</ul>
					<Button
						type='submit'
						disabled={formState.isSubmitting}
						buttonStyle='AUTH'
					>
						SIGN IN
					</Button>
					<Button buttonStyle='AUTH'>SIGN IN WITH GOOGLE</Button>
				</form>
			</div>
		</Container>
	)
}
