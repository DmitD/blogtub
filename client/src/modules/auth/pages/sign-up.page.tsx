import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useGoogleLogin } from '@react-oauth/google'
import { Container } from '../../../common/components/container/container'
import { AuthInput } from '../components/auth-input'
import { Button } from '../../../common/components/button/button'
import { useAuth } from '../hooks/use-auth'

interface SignUpFormValues {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

const validationSchema = yup.object({
	firstName: yup
		.string()
		.required('first name is required')
		.min(2, 'must be at least 2 characters long')
		.max(120),
	lastName: yup.string().default(''),
	email: yup
		.string()
		.required('email is required')
		.email('email is must be a valid email address'),
	password: yup
		.string()
		.required()
		.min(6, 'must be at least 6 characters long'),
	confirmPassword: yup
		.string()
		.required('please retype your password')
		.oneOf([yup.ref('password')], 'your passwords do not match'),
})

export const SignUpPage: React.FC = () => {
	const [showPassword, setShowPassword] = React.useState(false)
	const handleShowPassword = () => setShowPassword(!showPassword)

	const { signUp, signInGoogle } = useAuth()

	const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(validationSchema),
	})

	const navigate = useNavigate()

	const onSubmit = async (values: SignUpFormValues) => {
		try {
			await signUp(values)
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
				<h5 className='text-2xl text-center mb-2'>Sign Up</h5>
				<p className='font-source text-center mb-4'>
					<Link
						to='/sign-in'
						className='text-theme-green hover:text-theme-darkGreen'
					>
						Have an account?
					</Link>
				</p>
				<form
					className='grid grid-cols-2 gap-4'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<AuthInput
						placeholder='First name*'
						type='text'
						authInputStyle='HALF'
						{...register('firstName')} //register for working with ref (uncontrolled input)
					/>
					<AuthInput
						placeholder='Last name'
						type='text'
						authInputStyle='HALF'
						{...register('lastName')}
					/>
					<AuthInput placeholder='Email*' type='email' {...register('email')} />
					<AuthInput
						placeholder='Password*'
						type={showPassword ? 'text' : 'password'}
						handleShowPassword={handleShowPassword}
						{...register('password')}
					/>
					<AuthInput
						placeholder='Repeat password*'
						type='password'
						{...register('confirmPassword')}
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
						SIGN UP
					</Button>
				</form>
				<Button onClick={authWithGoogle} buttonStyle='GOOGLE'>
					SIGN IN WITH GOOGLE
				</Button>
			</div>
		</Container>
	)
}
