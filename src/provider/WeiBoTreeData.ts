import type { TreeDataProvider, TreeItemCollapsibleState } from 'vscode'
import { TreeItem } from 'vscode'
import { getWeiBoData } from '../request'

export class WeiBoData extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState,
    public readonly description?: string,
    public readonly tooltip?: string,
    public readonly iconPath?: string | { light: string; dark: string },
    public readonly command?: {
      command: string
      title: string
      arguments?: any[]
    },
  ) {
    super(label, collapsibleState)
  }
}

export class WeiBoTreeDataProvider implements TreeDataProvider<WeiBoData> {
  getTreeItem(element: WeiBoData): TreeItem | Thenable<TreeItem> {
    return element
  }

  async getChildren() {
    return Promise.resolve(await getWeiBoData())
  }
}
