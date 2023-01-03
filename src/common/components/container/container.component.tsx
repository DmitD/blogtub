import React from 'react'

interface ContainerProps {}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
	children,
}) => {
	return <div className='max-w-screen-xl mx-auto'>{children}</div>
}
