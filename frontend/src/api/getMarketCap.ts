export interface StockResponse {
    data: {
        market_cap: number
        stock_code: string
    }[]
    total_market_cap: number
}

export const getMarketCap = async (
    stockCodes: string[],
): Promise<StockResponse> => {
    const response = await fetch('http://localhost:8000/api', {
        body: JSON.stringify({ stock_codes: stockCodes }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })

    const data: StockResponse = await response.json()

    return data
}
