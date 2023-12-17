import { useState } from 'react'

import { StockInfo, getMarketCap } from './api'
import { Button, CaptionInput } from './components'
import { stockData } from './constants'
import './index.css'
import { numberWithComma } from './util'

import {
    Cell,
    LabelList,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'] as const

const App = () => {
    const [stockCodes, setStockCodes] = useState<string[]>([''])
    const [validList, setValidList] = useState<boolean[]>([true])
    const [stockRes, setStockRes] = useState<StockInfo>()

    const onSubmit = async () => {
        const newValidList = [...validList]
        stockCodes.forEach((stockCode, index) => {
            newValidList[index] =
                !Object.keys(stockData).includes(stockCode) && stockCode !== ''
        })
        setValidList(newValidList)
        if (newValidList.some((valid) => !valid)) return
        const data = await getMarketCap(stockCodes)
        setStockRes(data)
    }

    return (
        <div className='h-[100svh] overflow-y-scroll bg-slate-50 p-8'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        {stockCodes.map((stockCode, index) => (
                            <div className='flex gap-2'>
                                <div className='flex-1'>
                                    <CaptionInput
                                        key={index}
                                        isValid={validList[index]}
                                        placeholder='〇〇株式会社'
                                        validationMessage='正しい会社名を入力してください'
                                        value={stockCode}
                                        onChange={(value) => {
                                            const newStockCodes = [
                                                ...stockCodes,
                                            ]
                                            newStockCodes[index] = value
                                            setStockCodes(newStockCodes)

                                            const newValidList = [...validList]
                                            newValidList[index] =
                                                !Object.keys(
                                                    stockData,
                                                ).includes(value)
                                            setValidList(newValidList)
                                        }}
                                    />
                                </div>
                                <button
                                    className='fill-red-600 p-1 hover:fill-red-700 active:fill-red-800'
                                    onClick={() => {
                                        const newStockCodes = [...stockCodes]
                                        newStockCodes.splice(index, 1)
                                        setStockCodes(newStockCodes)

                                        const newValidList = [...validList]
                                        newValidList.splice(index, 1)
                                        setValidList(newValidList)
                                    }}
                                >
                                    <svg
                                        height='16'
                                        viewBox='0 0 448 512'
                                        width='14'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        {/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. */}
                                        <path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z' />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant='success'
                        onClick={() => {
                            setStockCodes([...stockCodes, ''])
                            setValidList([...validList, true])
                        }}
                    >
                        お祈り追加
                    </Button>
                    <Button variant='primary' onClick={onSubmit}>
                        お祈り力を測定！！！
                    </Button>
                </div>
                {stockRes ? (
                    <>
                        <ResponsiveContainer height={400} width='100%'>
                            <PieChart height={800} width={800}>
                                <Pie
                                    cx='50%'
                                    cy='50%'
                                    data={stockRes.data}
                                    dataKey='marketCap'
                                    fill='#8884d8'
                                    nameKey='stockName'
                                >
                                    {/* <LabelList
                                        color='black'
                                        dataKey='stockName'
                                        position='inside'
                                    ></LabelList> */}
                                    {stockRes.data.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip></Tooltip>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className='flex flex-col gap-4 rounded-md bg-white p-4'>
                            お祈り力：
                            {numberWithComma(stockRes.totalMarketCap)}
                            <div className='flex flex-wrap gap-4'>
                                {stockRes.data.map((stock) => (
                                    <div key={stock.stockCode}>
                                        <div>{stock.stockName}</div>
                                        <div>
                                            {numberWithComma(stock.marketCap)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default App
