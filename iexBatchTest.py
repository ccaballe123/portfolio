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
    tr = -1
    td = 0

    names =  getStockInformation(json,symbols,"companyName")
    prices = getStockInformation(json,symbols,"latestPrice")
    change = getStockInformation(json,symbols,"changePercent")

    htmlLineEnd = "</td>\n"

    outputFile = open("Table/Table_Responsive_v1/table.html",'w')
    inputFile =  open("Table/Table_Responsive_v1/table_copy.html","r")

    lines = inputFile.readlines()
    for line in lines:
        #print(line)
        if("<tbody>" in line):
            tableBody = 1
        if(tableBody == 1):
            if("<tr>" in line):
                #print("tr: " + str(tr))
                tr = tr + 1
                #print("tr: " + str(tr))
                td = 0
            if("<td " in line):
                htmlLine = ""
                if(td == 0):
                    htmlLineStart = '         <td class="column1">'
                    htmlLine = htmlLineStart + names[tr] + htmlLineEnd
                elif(td == 1):
                    htmlLineStart = '         <td class="column2">'
                    htmlLine = htmlLineStart + symbols[tr].upper() + htmlLineEnd

                elif(td == 2):
                    htmlLineStart = '         <td class="column3">'
                    htmlLine = htmlLineStart +  "$" + str(round(prices[tr],2)) + htmlLineEnd

                elif(td == 3):
                    htmlLineStart = '         <td class="column4">'
                    htmlLine = htmlLineStart + str(round(change[tr]*100,2)) + "%" + htmlLineEnd

                else:
                    htmlLine = line
                #print(htmlLine)
                outputFile.write(htmlLine)
                #print("td: " + str(td))
                td = td + 1
                #print("td: " + str(td))
            else:
                outputFile.write(line)
        else:
            outputFile.write(line)


def main():
    stockSymbols = ["fb","aapl","ge","tsla","lmt"]
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
