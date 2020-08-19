# -*- Encoding:UTF-8 -*- #

#%%
#####1. import#####
import requests
import pandas as pd
import numpy as np
import matplotlib as mpl
import matplotlib.pylab as plt
from bs4 import BeautifulSoup

#Korean 한글 적용
from matplotlib import font_manager, rc
fn_name = font_manager.FontProperties(fname='C:/Windows/Fonts/gulim.ttc').get_name()
rc('font',family = fn_name)
##출처: https://redapply.tistory.com/entry/matplotlib-표-한글-적용하기 [Bigcat]
#%%
#####2. crawling######
#시가총액 사이트 ref
market_sumURL = "https://finance.naver.com/sise/sise_market_sum.nhn"
source_market_sum = requests.get(market_sumURL).text
mainSoup = BeautifulSoup(source_market_sum, 'html.parser')
tbody_tr = mainSoup.tbody.contents[3:12:2]
category = mainSoup.find('thead') #시가총액 사이트의 thead

#구체적 URL
companyCodes = {} #튜플
interestingURLs=[]

stockCap = []
thePer = []
theRoe = []

for eachTr in tbody_tr:
  companyCodes[str(eachTr.a.string)]=(eachTr.a["href"][-6:])
  stockCap.append(float(eachTr.select("td:nth-of-type(7)")[0].get_text().replace(",","")))
  thePer.append(float(eachTr.select("td:nth-of-type(11)")[0].get_text().replace(",","")))
  theRoe.append(float(eachTr.select("td:nth-of-type(12)")[0].get_text()))

#print("Capital = "+str(stockCap),", Per = " +str(thePer),", ROE = " + str(theRoe))
CCodeNameList= list(companyCodes.keys())

for _, companyCode in companyCodes.items():
  interestingURLs.append("https://finance.naver.com/item/main.nhn?code="+companyCode)

#시가 총액 사이트에서 카테고리 선별
ths = []
for cols in category.find_all('th'):
  ths.append(cols.get_text())

#%%
#3. 
#카테고리
stockName = ths[1] #기업 (주식) 이름
marketCap = ths[6] #시가총액
PER = ths[10]
ROE = ths[11]
print(stockName, marketCap, PER, ROE)
# %%
data = [stockCap,thePer,theRoe]
columns = (CCodeNameList[0], CCodeNameList[1], CCodeNameList[2], CCodeNameList[3],CCodeNameList[4])
rows = [marketCap, PER, ROE]
colors = ["blue","green","red"]
index = np.arange(len(columns)) + 1
bar_width = 0.25
y_offset = np.zeros(len(columns))
cell = []
plt.bar(index,data[0], bar_width, color = colors[0])
plt.yticks(np.arange(300000,3500000,step=500000))
plt.yscale("log")
plt.xticks([])
cell.append(data[row])
plt.title("시가총액")
table = plt.table(cellText = data, loc= 'bottom', rowLabels= rows, colLabels = columns)
plt.show()
plt.bar(index,data[1], bar_width, color = colors[1])
plt.xticks([])
plt.title("PER")
table = plt.table(cellText = data, loc= 'bottom', rowLabels= rows, colLabels = columns)
plt.show()
plt.bar(index, data[2], bar_width, color = colors[2])
plt.xticks([])
plt.title("ROE")
table = plt.table(cellText = data, loc= 'bottom', rowLabels= rows, colLabels = columns)