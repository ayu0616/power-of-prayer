import { ComponentProps } from 'react'

export interface InputProps extends ComponentProps<'input'> {
    isValid?: boolean
    validationMessage?: string
}

export const Input = ({
    isValid = true,
    validationMessage,
    className = '',
    ...props
}: InputProps) => {
    return (
        <div className='flex flex-col gap-1'>
            <input
                {...props}
                className={[
                    'rounded px-3 py-2 focus:ring-2 focus:ring-blue-600/50',
                    className,
                ].join(' ')}
            ></input>
            {!isValid && <p className='text-red-600 text-sm'>{validationMessage}</p>}
        </div>
    )
}
