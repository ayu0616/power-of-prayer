import { ComponentProps } from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
    variant?: 'primary' | 'secondary' | 'success'
}

const variantClasses = {
    primary:
        'bg-blue-600 text-white focus:ring-blue-600/50 hover:bg-blue-700 active:bg-blue-800',
    secondary:
        'bg-gray-600 text-white focus:ring-gray-600/50 hover:bg-gray-700 active:bg-gray-800',
    success:
        'bg-green-600 text-white focus:ring-green-600/50 hover:bg-green-700 active:bg-green-800',
} as const

export const Button = ({
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) => {
    const variantClass = variantClasses[variant]
    return (
        <button
            {...props}
            className={[
                'rounded px-3 py-2 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
                variantClass,
                className,
            ].join(' ')}
        ></button>
    )
}
