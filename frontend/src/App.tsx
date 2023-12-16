import { useState } from 'react'

import { StockResponse, getMarketCap } from './api'
import { Button, CaptionInput } from './components'
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
                            <CaptionInput
                                key={index}
                                placeholder='Enter stock code'
                                value={stockCode}
                                onChange={(value) => {
                                    const newStockCodes = [...stockCodes]
                                    newStockCodes[index] = value
                                    setStockCodes(newStockCodes)
                                }}
                            />
                        ))}
                    </div>
                    <Button
                        variant='success'
                        onClick={() => {
                            setStockCodes([...stockCodes, ''])
                        }}
                    >
                        Add stock code
                    </Button>
                    <Button variant='primary' onClick={onSubmit}>
                        submit
                    </Button>
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
