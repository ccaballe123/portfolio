#!/usr/local/bin/python3

import requests
from alpha_vantage.timeseries import TimeSeries

def ParsePrice(info):
    price = info.get("Global Quote").get("05. price")
    return price

def ParsePercent(info):
    percent = info.get("Global Quote").get("10. change percent")
    return percent

def ParseSymbol(info):
    symbol = info.get("Global Quote").get("01. symbol")
    return symbol

def main():
    api_key=open('AlphaKey.txt','r').read()
    data=requests.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=()'.format(api_key))
    data=data.json()

    symbol = ParseSymbol(data)
    price = ParsePrice(data)
    percent = ParsePercent(data)
    print(symbol + ": $" + price + ", " + percent)


if __name__ == '__main__':
    main()
