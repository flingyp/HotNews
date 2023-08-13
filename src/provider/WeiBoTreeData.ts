import * as path from 'node:path'
import type { ProviderResult, TreeDataProvider } from 'vscode'
import { TreeItem, TreeItemCollapsibleState } from 'vscode'

class WeiBoData extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState,
    public readonly description?: string,
    public readonly tooltip?: string,
    public readonly command?: {
      command: string
      title: string
      arguments?: any[]
    },
  ) {
    super(label, collapsibleState)
  }

  iconPath = {
    light: path.join(__filename, '../', '../', 'assets', 'logo.png'),
    dark: path.join(__filename, '../', '../', 'assets', 'logo.png'),
  }
}

export class WeiBoTreeDataProvider implements TreeDataProvider<WeiBoData> {
  getTreeItem(element: WeiBoData): TreeItem | Thenable<TreeItem> {
    return element
  }

  getChildren(element?: WeiBoData): ProviderResult<WeiBoData[]> {
    const renderData = [
      new WeiBoData('Hello-1', TreeItemCollapsibleState.None, 'HotNews-1', 'This is a tooltip'),
      new WeiBoData('Hello-2', TreeItemCollapsibleState.None, 'HotNews-2', 'This is a tooltip'),
      new WeiBoData('Hello-3', TreeItemCollapsibleState.None, 'HotNews-3'),
      new WeiBoData('Hello-4', TreeItemCollapsibleState.None, undefined, 'This is a tooltip'),
      new WeiBoData('Hello-5', TreeItemCollapsibleState.None, '(+542万)'),
    ]

    return Promise.resolve(renderData)
  }
}
