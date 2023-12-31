from typing import overload

import yfinance


class yf:
    @staticmethod
    @overload
    def get_market_cap(stock_code: str) -> int:
        ...

    @staticmethod
    @overload
    def get_market_cap(stock_code: list[str]) -> list[int]:
        ...

    @staticmethod
    def get_market_cap(stock_code: str | list[str]):
        if isinstance(stock_code, list):
            res_li: list[int] = [yfinance.Ticker(code).info["marketCap"] for code in stock_code]
            return res_li
        else:
            res: int = yfinance.Ticker(stock_code).info["marketCap"]
            return res
