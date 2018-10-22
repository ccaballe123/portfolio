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

def writeTable(json,symbols):
    tableBody = 0
    times = 0

    names =  getStockInformation(json,symbols,"companyName")
    prices = getStockInformation(json,symbols,"latestPrice")
    change = getStockInformation(json,symbols,"changePercent")


    outputFile = open("Table/Table_Responsive_v1/table.html",'w')
    inputFile =  open("Table/Table_Responsive_v1/table_copy.html","r")

    lines = inputFile.readlines()
    for line in lines:
        if("<tbody>" in line):
            outputFile.write(line)
            tableBody = 1

        if(tableBody == 1 and times == 0):
            index = 0
            for x in symbols:
                outputFile.write("              <tr>\n")
                outputFile.write('                <td class="column1">' + names[index] + "</td>\n")
                outputFile.write('                <td class="column2">' + symbols[index].upper() + "</td>\n")
                outputFile.write('                <td class="column3">' + "$" + str(round(prices[index],2)) + "</td>\n")
                outputFile.write('                <td class="column3">' + str(round(change[index]*100,2)) + "%" + "</td>\n")
                outputFile.write("              </tr>\n")
                index += 1
            times = 1

        if("</tbody>" in line):
            tableBody = 0
        if(tableBody == 0):
            outputFile.write(line)


def main():
    stockSymbols = ["fb","aapl","ge","tsla","lmt","hear"]
    print(createGetRequest(stockSymbols))
    r = requests.get(createGetRequest(stockSymbols))
    r = r.json()
    print()
    print(stockSymbols)
    print(getStockInformation(r,stockSymbols,"companyName"))
    print(getStockInformation(r,stockSymbols,"latestPrice"))
    print(getStockInformation(r,stockSymbols,"changePercent"))
    writeTable(r,stockSymbols)

if __name__ == '__main__':
    main()
