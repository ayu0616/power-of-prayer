import { useState } from 'react'

import { StockResponse, getMarketCap } from './api'
import { Input } from './components/Input'
import './index.css'
import { numberWithComma } from './util'

const App = () => {
    const [stockCodes, setStockCodes] = useState<string[]>(['4307.T', '4722.T'])
    const [stockRes, setStockRes] = useState<StockResponse>()

    const onSubmit = async () => {
        const data = await getMarketCap(stockCodes)
        setStockRes(data)
    }

    return (
        <div className='bg-slate-50 p-8'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        {stockCodes.map((stockCode, index) => (
                            <Input
                                key={index}
                                placeholder='Enter stock code'
                                value={stockCode}
                                onChange={(e) => {
                                    const newStockCodes = [...stockCodes]
                                    newStockCodes[index] = e.target.value
                                    setStockCodes(newStockCodes)
                                }}
                            />
                        ))}
                    </div>
                    <button
                        className='rounded bg-green-600 px-3 py-2 text-white'
                        onClick={() => {
                            setStockCodes([...stockCodes, ''])
                        }}
                    >
                        Add stock code
                    </button>
                    <button
                        className='rounded bg-blue-600 px-3 py-2 text-white'
                        onClick={onSubmit}
                    >
                        submit
                    </button>
                </div>
                {stockRes ? (
                    <div className='flex flex-col gap-4 rounded-md bg-white p-4'>
                        お祈り力：{numberWithComma(stockRes.total_market_cap)}
                        <div className='flex flex-wrap gap-4'>
                            {stockRes.data.map((stock) => (
                                <div key={stock.stock_code}>
                                    <div>{stock.stock_code}</div>
                                    <div>
                                        {numberWithComma(stock.market_cap)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default App
