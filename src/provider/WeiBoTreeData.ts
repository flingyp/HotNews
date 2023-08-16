import type { Event, TreeDataProvider, TreeItemCollapsibleState } from 'vscode'
import { EventEmitter, TreeItem } from 'vscode'
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
  private _onDidChangeTreeData: EventEmitter<WeiBoData | undefined | null | void> = new EventEmitter<WeiBoData | undefined | null | void>()
  readonly onDidChangeTreeData: Event<WeiBoData | undefined | null | void> = this._onDidChangeTreeData.event

  getTreeItem(element: WeiBoData): TreeItem | Thenable<TreeItem> {
    return element
  }

  async getChildren() {
    return Promise.resolve(await getWeiBoData())
  }

  refresh(): void {
    this._onDidChangeTreeData.fire()
  }
}
