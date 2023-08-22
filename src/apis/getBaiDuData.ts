import path from 'node:path'
import { type Command, TreeItemCollapsibleState } from 'vscode'
import { BaiDuData } from '../provider'
import type { BaiduHotNews } from '../utils'
import { parseBaiduContent } from '../utils'

export async function getBaiDuData() {
  const realTimeList: BaiduHotNews[] = await parseBaiduContent() || []
  const baiDuList = realTimeList.map((item: BaiduHotNews, index) => {
    return {
      title: item.title,
      value: item.hotValue,
      rankValue: index + 1,
      tag: item.hotTag,
      url: item.url,
    }
  })
  const renderData: any[] = []
  baiDuList.forEach((item, index) => {
    const label = `${item.rankValue} ${item.title}`
    const description = `${item.value} ${item.tag}`
    let iconPath
    if (index < 3)
      iconPath = path.join(__filename, '../', '../', 'assets', `rank_${index + 1}.png`)

    // Executes when a tree item is clicked.
    const command: Command = {
      title: 'open',
      command: 'WebView-BaiDu',
      arguments: [item.title, item.url],
    }

    const treeItem = new BaiDuData(label, TreeItemCollapsibleState.None, description, undefined, iconPath, command)
    renderData.push(treeItem)
  })
  return renderData
}
