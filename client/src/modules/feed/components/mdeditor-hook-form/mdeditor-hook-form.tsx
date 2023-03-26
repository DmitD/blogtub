import MDEditor from '@uiw/react-md-editor'
import React, { ComponentProps } from 'react'
import { Control, Controller } from 'react-hook-form'

interface MDEditorHookFormProps extends ComponentProps<typeof MDEditor> {
	name: string
	control: Control<any>
}

export const MDEditorHookForm: React.FC<MDEditorHookFormProps> = ({
	name,
	control,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<MDEditor value={value} onChange={onChange} />
			)}
		/>
	)
}
