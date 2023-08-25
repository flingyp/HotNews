import path from 'node:path'
import { type Command, TreeItemCollapsibleState } from 'vscode'
import { JueJinData } from '../provider'
import { request } from '../request'

export async function getJueJinData() {
  const jueJinUrl = 'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot'
  const webLink = 'https://juejin.cn/post'

  const { data: responseData } = await request(jueJinUrl, {
    method: 'GET',
  })
  // responseData: []
  const realTimeList: any[] = responseData || []
  const jueJinList: any[] = []

  realTimeList.forEach((item, index) => {
    jueJinList.push({
      title: item.content.title,
      hotValue: item.content_counter.hot_rank, // 文章热度
      viewValue: item.content_counter.view, // 文章浏览量
      authorName: item.author.name, // 作者名字
      rankValue: index + 1,
      url: `${webLink}/${item.content.content_id}`,
    })
  })

  const renderData: any[] = []
  jueJinList.forEach((item, index) => {
    const label = `${item.rankValue} ${item.title}`
    const description = `${item.hotValue} 热度`
    const tooltip = `作者：${item.authorName}，浏览量：${item.viewValue}`

    let iconPath
    if (index < 3)
      iconPath = path.join(__filename, '../', '../', 'assets', `rank_${index + 1}.png`)

    // Executes when a tree item is clicked.
    const command: Command = {
      title: 'open',
      command: 'WebView-JueJin',
      arguments: [item.title, item.authorName, item.url],
    }

    const treeItem = new JueJinData(label, TreeItemCollapsibleState.None, description, tooltip, iconPath, command)

    renderData.push(treeItem)
  })

  return renderData
}
