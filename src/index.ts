import type { ExtensionContext } from 'vscode'
import { ViewColumn, commands, window } from 'vscode'
import { WeiBoTreeDataProvider } from './provider'
import { getWebViewContainerContent } from './webview'

const WebViewStash = new Map()

export function activate(context: ExtensionContext) {
  // Register TreeDataProvider
  window.registerTreeDataProvider('HotNews-WeiBo', new WeiBoTreeDataProvider())
  // window.createTreeView('HotNews-WeiBo', { treeDataProvider: new WeiBoTreeDataProvider() })

  // Register Command
  commands.registerCommand('WebView-WeiBo', (title: string, category: string, link: string) => {
    WebViewStash.get('weiBoWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('weiBoWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  context.subscriptions.push()
}

export function deactivate() { }
