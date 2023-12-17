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
                    'rounded border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600/75 outline-none',
                    className,
                ].join(' ')}
            ></input>
            {!isValid && (
                <p className='text-sm text-red-600'>{validationMessage}</p>
            )}
        </div>
    )
}
