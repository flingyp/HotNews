import path from 'node:path'
import { type Command, TreeItemCollapsibleState } from 'vscode'
import { JueJinData } from '../provider'
import { request } from '../request'

export async function getJueJiData() {
  const jueJinUrl = 'https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed'
  const webLink = 'https://juejin.cn/post'

  const { data: responseData } = await request(jueJinUrl, {
    method: 'POST',
  })
  // responseData: []
  const realTimeList: any[] = responseData || []
  const jueJiList: any[] = []

  realTimeList.forEach((item, index) => {
    if (index >= 1) {
      jueJiList.push({
        title: item.item_info.article_info.title,
        viewCount: item.item_info.article_info.view_count, // 文章阅读量
        diggCount: item.item_info.article_info.digg_count, // 文章点赞量
        authorName: item.item_info.author_user_info.user_name, // 作者名字
        category: item.item_info.tags || [], // 文章分类
        rankValue: index,
        url: `${webLink}/${item.item_info.article_id}`,
      })
    }
  })
  const renderData: any[] = []
  jueJiList.forEach((item, index) => {
    const label = `${item.rankValue} ${item.title}`
    let description = ''
    item.category.forEach((category: any) => {
      if (description === '')
        description = category.tag_name
      else description += `,${category.tag_name}`
    })
    const tooltip = `作者：${item.authorName},阅读量：${item.viewCount},点赞量：${item.diggCount}`

    let iconPath
    if (index < 3)
      iconPath = path.join(__filename, '../', '../', 'assets', `rank_${index + 1}.png`)

    // Executes when a tree item is clicked.
    const command: Command = {
      title: 'open',
      command: 'WebView-JueJi',
      arguments: [item.title, item.category, item.url],
    }

    const treeItem = new JueJinData(label, TreeItemCollapsibleState.None, description, tooltip, iconPath, command)

    renderData.push(treeItem)
  })

  return renderData
}
