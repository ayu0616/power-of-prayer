import { stockData } from '../constants'

interface StockResponse {
    data: {
        market_cap: number
        stock_code: string
    }[]
    total_market_cap: number
}

interface ErrorResponse {
    error: string
}

export interface StockInfo {
    data: {
        marketCap: number
        stockCode: string
        stockName: string
    }[]
    totalMarketCap: number
}

type Response =
    | {
          data: StockInfo
          ok: true
      }
    | {
          data: ErrorResponse
          ok: false
      }

const isDev = import.meta.env.DEV

export const getMarketCap = async (stockCodes: string[]): Promise<Response> => {
    const url = isDev
        ? new URL(location.href).origin.replace(/:\d{4}/, ':8000')
        : ''
    const response = await fetch(`${url}/api`, {
        body: JSON.stringify({ stock_codes: stockCodes }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })

    if (!response.ok) {
        const data: ErrorResponse = await response.json()
        return { data: { ...data }, ok: false }
    }

    const data: StockResponse = await response.json()
    const res: StockInfo = {
        data: data.data.map((stock) => ({
            marketCap: stock.market_cap,
            stockCode: stock.stock_code,
            stockName:
                stockData.find((s) => s.stockCode === stock.stock_code)
                    ?.stockName || '',
        })),
        totalMarketCap: data.total_market_cap,
    }

    return { data: { ...res }, ok: true }
}
