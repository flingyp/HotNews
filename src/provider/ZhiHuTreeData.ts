import type { Event, TreeDataProvider, TreeItemCollapsibleState } from 'vscode'
import { EventEmitter, TreeItem } from 'vscode'
import { getZhiHuData } from '../request'

export class ZhiHuData extends TreeItem {
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

export class ZhiHuTreeDataProvider implements TreeDataProvider<ZhiHuData> {
  private _onDidChangeTreeData: EventEmitter<ZhiHuData | undefined | null | void> = new EventEmitter<ZhiHuData | undefined | null | void>()
  readonly onDidChangeTreeData: Event<ZhiHuData | undefined | null | void> = this._onDidChangeTreeData.event

  getTreeItem(element: ZhiHuData): TreeItem | Thenable<TreeItem> {
    return element
  }

  async getChildren() {
    return Promise.resolve(await getZhiHuData())
  }

  refresh(): void {
    this._onDidChangeTreeData.fire()
  }
}
