import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useGoogleLogin } from '@react-oauth/google'
import { Container } from '../../../common/components/container/container'
import { Input } from '../../../common/components/input/input'
import { Button } from '../../../common/components/button/button'
import { useAuth } from '../hooks/use-auth'
import { ErrorsList } from '../../../common/components/errors-list/errors-list'

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

	const { signIn, signInGoogle } = useAuth()

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

	const authWithGoogle = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: codeResponse => {
			signInGoogle(codeResponse.code)
			navigate('/')
		},
		onError: errorResponse => console.log(errorResponse),
	})

	return (
		<Container>
			<div className='max-w-md mx-auto mt-8 px-4 py-6 rounded bg-white shadow-articlePage'>
				<h5 className='text-2xl text-center mb-2'>Sign In</h5>
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
					<Input
						placeholder='Email*'
						type='email'
						inputStyle='WHOLE'
						{...register('email')}
					/>
					<Input
						placeholder='Password*'
						type={showPassword ? 'text' : 'password'}
						inputStyle='WHOLE'
						handleShowPassword={handleShowPassword}
						{...register('password')}
					/>
					<ErrorsList errors={formState.errors} errorStyle='AUTH' />
					<Button
						type='submit'
						disabled={formState.isSubmitting}
						buttonStyle='AUTH'
					>
						SIGN IN
					</Button>
				</form>
				<Button onClick={authWithGoogle} buttonStyle='GOOGLE'>
					SIGN IN WITH GOOGLE
				</Button>
			</div>
		</Container>
	)
}
