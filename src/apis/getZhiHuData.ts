import path from 'node:path'
import { type Command, TreeItemCollapsibleState } from 'vscode'
import { ZhiHuData } from '../provider'
import { request } from '../request'

export async function getZhiHuData() {
  const zhiHuUrl = 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50'
  const webLink = 'https://www.zhihu.com/question/'
  const { data: responseData } = await request(zhiHuUrl, { method: 'GET' })
  // responseData: [...{}]
  const realTimeList: unknown[] = responseData || []
  // console.log('realTimeList->>>>', realTimeList)
  const zhiHuList = realTimeList.map((item: any, index) => {
    return {
      title: item.target.title,
      excerpt: item.target.excerpt,
      value: item.detail_text,
      rankValue: index + 1,
      url: `${webLink}${item.target.id}`,
    }
  })
  const renderData: any[] = []
  zhiHuList.forEach((item, index) => {
    const label = `${item.rankValue} ${item.title} `
    const description = item.value
    const tooltip = item.excerpt
    let iconPath
    if (index < 3)
      iconPath = path.join(__filename, '../', '../', 'assets', `rank_${index + 1}.png`)

    // Executes when a tree item is clicked.
    const command: Command = {
      title: 'open',
      command: 'OpenLink-ZhiHu',
      arguments: [item.title, item.url],
    }

    const treeItem = new ZhiHuData(label, TreeItemCollapsibleState.None, description, tooltip, iconPath, command)
    renderData.push(treeItem)
  })
  return renderData
}
