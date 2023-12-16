import { ChangeEvent, ComponentProps, useState } from 'react'

import { Input, InputProps } from '.'

export interface CaptionInputProps extends Omit<InputProps, 'onChange'> {
    onChange?: (value: string) => void
    value?: string
}

const getCaptions = (value: string) => {
    return ['hoge', 'fuga', 'hoge', 'hoge', 'hoge']
}

export const CaptionInput = ({
    className = '',
    value = '',
    onChange,
    ...props
}: CaptionInputProps) => {
    const [showCaption, setShowCaption] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }
    const handleCaptionClick = (value: string) => {
        onChange?.(value)
    }
    const handleFocus = () => {
        setShowCaption(true)
    }
    const handleBlur = () => {
        setTimeout(() => setShowCaption(false), 10)
    }

    const captions = getCaptions(value)
    return (
        <div className='relative'>
            <Input
                {...props}
                className={['w-full', className].join(' ')}
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
            ></Input>
            <CaptionContainer className={showCaption ? '' : 'hidden'}>
                {captions.map((caption, index) => (
                    <CaptionItem key={index} onClick={handleCaptionClick}>
                        {caption}
                    </CaptionItem>
                ))}
            </CaptionContainer>
        </div>
    )
}

const CaptionContainer = ({
    className = '',
    ...props
}: ComponentProps<'div'>) => {
    return (
        <div
            {...props}
            className={['absolute z-10 w-full divide-y', className].join(' ')}
        ></div>
    )
}

interface CaptionItemProps extends Omit<ComponentProps<'div'>, 'onClick'> {
    children: string
    onClick?: (value: string) => void
}

const CaptionItem = ({
    className = '',
    children,
    onClick,
    ...props
}: CaptionItemProps) => {
    return (
        <div
            {...props}
            className={['bg-white p-2 hover:bg-slate-50', className].join(' ')}
            onClick={() => onClick?.(children)}
        >
            {children}
        </div>
    )
}
