#!/usr/local/bin/python3
import requests
from alpha_vantage.timeseries import TimeSeries

def ParsePrice(info):
    price = info.get("2. price")
    return price

def ParsePercent(info):
    percent = info.get("10. change percent")
    return percent

def ParseSymbol(info):
    symbol = info.get("1. symbol")
    return symbol

def main():
    api_key=open('AlphaKey.txt','r').read()
    ts = TimeSeries(key='()'.format(api_key), output_format='json')
    stocks = ["AAPL","GE","TSLA"]
    data, meta_data = ts.get_batch_stock_quotes(stocks)

    index = 0
    for x in stocks:
        symbol = ParseSymbol(data[index])
        price  = ParsePrice(data[index])
        print(symbol + ": $" + price)

        index += 1

if __name__ == '__main__':
    main()
