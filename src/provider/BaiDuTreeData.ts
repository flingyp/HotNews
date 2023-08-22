import type { Event, TreeDataProvider, TreeItemCollapsibleState } from 'vscode'
import { EventEmitter, TreeItem } from 'vscode'
import { getBaiDuData } from '../request'

export class BaiDuData extends TreeItem {
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

export class BaiDuTreeDataProvider implements TreeDataProvider<BaiDuData> {
  private _onDidChangeTreeData: EventEmitter<BaiDuData | undefined | null | void> = new EventEmitter<BaiDuData | undefined | null | void>()
  readonly onDidChangeTreeData: Event<BaiDuData | undefined | null | void> = this._onDidChangeTreeData.event

  getTreeItem(element: BaiDuData): TreeItem | Thenable<TreeItem> {
    return element
  }

  async getChildren() {
    return Promise.resolve(await getBaiDuData())
  }

  refresh(): void {
    this._onDidChangeTreeData.fire()
  }
}
