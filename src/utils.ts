import https from 'node:https'
import type { Element } from 'cheerio'
import cheerio from 'cheerio'

export function fetchBaiduHtml(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get('https://top.baidu.com/board?tab=realtime', (res) => {
      let html = ''
      res.on('data', (chunk) => {
        html += chunk
      })
      res.on('end', () => {
        resolve(html)
      })
    }).on('error', (e) => {
      reject(e)
    })
  })
}

export interface BaiduHotNews {
  title: string
  hotValue: string
  hotTag: string
  url: string
}

export async function parseBaiduContent(): Promise<BaiduHotNews[]> {
  const $ = cheerio.load(await fetchBaiduHtml())
  const baiDuHotNewsList: BaiduHotNews[] = []
  $('.category-wrap_iQLoo').each((i: number, element: Element) => {
    const title = $('.content_1YWBm .c-single-text-ellipsis', element).text().trim()
    const hotValue = $('.trend_2RttY .hot-index_1Bl1a', element).text().trim()
    const hotTag = $('.hot-tag_1G080', element).text()
    const url = $('.large_nSuFU a', element).attr('href')!
    baiDuHotNewsList.push({
      title,
      hotValue,
      hotTag,
      url,
    })
  })

  return baiDuHotNewsList
}
