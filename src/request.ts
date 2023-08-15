import * as path from 'node:path'
import type { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'
import type { Command } from 'vscode'
import { TreeItemCollapsibleState } from 'vscode'
import { WeiBoData } from './provider'

export async function request(url: string, params: RequestInit) {
  const response = await fetch(url, params)
  const data = await response.json()
  return data
}

export async function getWeiBoData() {
  const weiBoUrl = 'https://weibo.com/ajax/side/hotSearch'
  const webLink = 'https://s.weibo.com/weibo'
  const { data: responseData } = await request(weiBoUrl, { method: 'GET' })
  // responseData: {hotogv, hotgovs, realtime}
  const realTimeList: unknown[] = responseData.realtime || []
  // console.log('realTimeList->>>>', realTimeList)
  const weiBoList = realTimeList.map((item: any, index) => {
    return {
      title: item.word,
      labelName: item.label_name,
      category: item.category || item.ad_type,
      value: item.num,
      rankValue: item.realpos || index + 1,
      url: `${webLink}?q=${item.word}&Refer=top`,
    }
  })
  const renderData: any[] = []
  weiBoList.forEach((item, index) => {
    const label = `${item.rankValue} ${item.title}`
    const description = item.labelName ? `${item.value}（${item.labelName}）` : `${item.value}`
    const tooltip = item.category
    let iconPath
    if (index < 3)
      iconPath = path.join(__filename, '../', '../', 'assets', `rank_${index + 1}.png`)

    // Executes when a tree item is clicked.
    const command: Command = {
      title: 'open',
      command: 'WebView-WeiBo',
      arguments: [item.title, item.category, item.url],
    }

    const treeItem = new WeiBoData(label, TreeItemCollapsibleState.None, description, tooltip, iconPath, command)
    renderData.push(treeItem)
  })
  return renderData
}
