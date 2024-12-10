var lock = 0;

/**
 * domain 域名，默认https://tv.cctv.com，参数主要解决跨域问题，可通过代理默认地址解决
 * year 年 Number
 * month 月 Number
 * day 日 Number
 */
function getNews(element, domain, year, month, day) {
  const newsLock = lock
  lock++
  let urlMonth = month
  if (urlMonth < 10) {
    urlMonth = '0' + Number(urlMonth)
  }
  let urlDay = day
  if (urlDay < 10) {
    urlDay = '0' + Number(urlDay)
  }

  const newsDate = '' + year + urlMonth + urlDay
  const newsList = sessionStorage.getItem(newsDate)
  if (newsList) {
    element.innerHTML = newsList
  } else {
    const loadingEl = document.querySelector('.loading');
    loadingEl.style.display = 'block';
    let url = domain + "/lm/xwlb/day/" + newsDate + ".shtml";
    fetch(url).then(res => res.text()).then(data => {
      console.log(data)
      let urlSet = new Set()
      let dataStart, dataEnd, urlData
      while (data.indexOf('://tv.cctv.com') !== -1) {
        dataStart = data.indexOf('https://')
        let domainName = 'https://tv.cctv.com'
        if (dataStart === -1) {
          dataStart = data.indexOf('http://')
          domainName = 'http://tv.cctv.com'
        }
        dataEnd = data.indexOf('.shtml') + '.shtml'.length
        urlData = data.substring(dataStart, dataEnd)
        urlData = urlData.replaceAll(domainName, domain)
        urlSet.add(urlData)
        data = data.substring(dataEnd)
      }
      let urlArr = [...urlSet]
      let permiseArr = []
      for (let i = 0; i < urlArr.length; i++) {
        if (i === 0) {
          const request = getNewsHead(urlArr[i], newsDate)
          permiseArr[i] = request
        } else {
          const request = getNewsInfo(urlArr[i])
          permiseArr[i] = request
        }
      }
      Promise.all(permiseArr).then((values) => {
        const dataAll = values.join('')
        if (newsLock === lock - 1) {
          sessionStorage.setItem(newsDate, dataAll);
          element.innerHTML = dataAll
          //结束加载
          loadingEl.style.display = 'none';
        }
      });
    }).catch(error => {
      console.log(error)
      if (newsLock === lock - 1) {
        sessionStorage.setItem(newsDate, '今日新闻未送达！');
        element.innerHTML = '今日新闻未送达！'
        //结束加载
        loadingEl.style.display = 'none';
      }
    });
  }
}

function getNewsHead(url, newsDate) {
  return new Promise((resolve) => {
    fetch(url).then(res => res.text()).then(result => {
      console.log(result)
      let dataStart = 0;
      while (dataStart >= 0) {
        dataStart = result.indexOf('视频简介')
        result = result.substring(dataStart + '视频简介'.length)
      }
      dataStart = result.indexOf('">') + '">'.length
      result = result.substring(dataStart)
      let dataEnd = result.indexOf('</div>')
      result = result.substring(0, dataEnd)
      result = '<div style="margin-bottom: 30px"><p style="margin: 5px">' + result + '</p></div>'
      result += '<hr><div style="margin: 10px 0"><p><h4>以下为新闻详细内容：</h4></p></div>'
      result = result.replaceAll('；', '；</p><p style="margin: 5px">')
      result = result.replaceAll('：', '：</p><p style="margin: 5px">')
      result = result.replaceAll('本期节目主要内容：', '<p><h4>' + newsDate + '新闻联播主要内容：</h4></p>')
      resolve(result)
    })
  })
}

function getNewsInfo(url) {
  return new Promise((resolve) => {
    fetch(url).then(res => res.text()).then(result => {
      console.log(result)
      let dataItem = ''
      //<title>[视频]中联部举办十九届六中全会精神专题宣介会_CCTV节目官网-CCTV-1_央视网(cctv.com)</title>
      let dataStart = result.indexOf('[视频]') + '[视频]'.length
      let dataEnd = result.indexOf('</title>')
      let title = result.substring(dataStart, dataEnd)
      title = title.replace('_CCTV节目官网-CCTV-1_央视网(cctv.com)', '')
      dataItem += '<p style="margin-top: 20px"><h4>' + title + '</h4></p>'
      dataStart = result.indexOf('主要内容')
      result = result.substring(dataStart)
      dataStart = result.indexOf('<p')
      result = result.substring(dataStart)
      dataEnd = result.indexOf('</div>')

      result = result.substring(0, dataEnd)
      result = result.replace('主要内容', '<div style="margin-bottom: 20px">')
      result = result.replace('<strong>央视网消息</strong>', '')
      result = result.replace('（新闻联播）：', '')
      result = result.replaceAll('<p>', '<p style="margin: 5px">')
      dataItem += result
      resolve(dataItem)
    })
  })
}
