import { ComponentProps, useState } from 'react'

export interface InputProps extends ComponentProps<'input'> {}

export const Input = ({ className = '', ...props }: InputProps) => {
    return (
        <input
            {...props}
            className={[
                'rounded px-3 py-2 focus:ring-2 focus:ring-blue-600/50',
                className,
            ].join(' ')}
        ></input>
    )
}
