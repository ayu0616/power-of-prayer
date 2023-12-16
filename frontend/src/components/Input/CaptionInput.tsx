import { ChangeEvent, ComponentProps, useEffect, useState } from 'react'

import { stockData } from '../../constants'
import { toHankaku } from '../../util'

import { Input, InputProps } from '.'

export interface CaptionInputProps extends Omit<InputProps, 'onChange'> {
    onChange?: (value: string) => void
    value?: string
}

const getCaptions = (value: string) => {
    if (value) {
        const reg = new RegExp(toHankaku(value), 'i')
        return stockData.filter((d) => reg.test(toHankaku(d.stockName)))
    } else {
        return stockData
    }
}

export const CaptionInput = ({
    className = '',
    value = '',
    onChange,
    ...props
}: CaptionInputProps) => {
    const [inputValue, setInputValue] = useState(
        value
            ? stockData.find((d) => d.stockCode === value)?.stockName ?? ''
            : '',
    )
    const [showCaption, setShowCaption] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }
    const handleCaptionClick = ({
        stockCode,
        stockName,
    }: {
        stockCode: string
        stockName: string
    }) => {
        onChange?.(stockCode)
        setInputValue(stockName)
    }
    const handleFocus = () => {
        setShowCaption(true)
    }
    const handleBlur = () => {
        setTimeout(() => setShowCaption(false), 10)
    }

    useEffect(() => {
        setInputValue(
            value
                ? stockData.find((d) => d.stockCode === value)?.stockName ?? ''
                : '',
        )
    }, [value])

    const captions = getCaptions(inputValue)
    return (
        <div className='relative'>
            <Input
                {...props}
                className={['w-full', className].join(' ')}
                value={inputValue}
                onBlur={handleBlur}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    onChange?.('')
                }}
                onFocus={handleFocus}
            ></Input>
            <Input
                className='hidden'
                value={value}
                onChange={handleChange}
            ></Input>
            <CaptionContainer
                className={['max-h-[50vh]', showCaption ? '' : 'hidden'].join(
                    ' ',
                )}
            >
                {captions.map((caption, index) => (
                    <CaptionItem
                        key={index}
                        stockCode={caption.stockCode}
                        stockName={caption.stockName}
                        onClick={handleCaptionClick}
                    ></CaptionItem>
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
            className={[
                'absolute z-10 w-full divide-y overflow-y-auto',
                className,
            ].join(' ')}
        ></div>
    )
}

interface CaptionItemProps extends Omit<ComponentProps<'div'>, 'onClick'> {
    onClick?: (data: { stockCode: string; stockName: string }) => void
    stockCode?: string
    stockName?: string
}

const CaptionItem = ({
    className = '',
    stockCode = '',
    stockName = '',
    onClick,
    ...props
}: CaptionItemProps) => {
    return (
        <div
            {...props}
            className={['bg-white p-2 hover:bg-slate-50', className].join(' ')}
            onClick={() => onClick?.({ stockCode, stockName })}
        >
            {stockName}
        </div>
    )
}
