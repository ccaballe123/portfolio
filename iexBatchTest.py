#!/usr/local/bin/python3

import requests



def createGetRequest(symbols):
    http = "https://api.iextrading.com/1.0/stock/market/batch?symbols="
    for x in symbols:
        http = http + x + ','
    http = http[0:(len(http)-1)]
    http = http + "&types=quote&range=1m&last=5"
    return http

def getStockInformation(json, symbols, type):
    names = []
    for x in symbols:
        names.append(json.get(x.upper()).get("quote").get(type))

    return names

def main():
    stockSymbols = ["fb","aapl","ge","tsla","hear"]
    print(createGetRequest(stockSymbols))
    r = requests.get(createGetRequest(stockSymbols))
    r = r.json()
    print()
    print(stockSymbols)
    print(getStockInformation(r,stockSymbols,"companyName"))
    print(getStockInformation(r,stockSymbols,"latestPrice"))
    print(getStockInformation(r,stockSymbols,"changePercent"))

if __name__ == '__main__':
    main()
