import type { Event, TreeDataProvider, TreeItemCollapsibleState } from 'vscode'
import { EventEmitter, TreeItem } from 'vscode'
import { getJueJiData } from '../request'

export class JueJinData extends TreeItem {
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

export class JueJinTreeDataProvider implements TreeDataProvider<JueJinData> {
  private _onDidChangeTreeData: EventEmitter<JueJinData | undefined | null | void> = new EventEmitter<JueJinData | undefined | null | void>()
  readonly onDidChangeTreeData: Event<JueJinData | undefined | null | void> = this._onDidChangeTreeData.event

  getTreeItem(element: JueJinData): TreeItem | Thenable<TreeItem> {
    return element
  }

  async getChildren() {
    return Promise.resolve(await getJueJiData())
  }

  refresh(): void {
    this._onDidChangeTreeData.fire()
  }
}
