import type { ExtensionContext } from 'vscode'
import { ViewColumn, commands, window } from 'vscode'
import { getWebViewContainerContent } from './webview'
import { WeiBoTreeDataProvider } from './provider'

const WebViewStash = new Map()

export function activate(context: ExtensionContext) {
  // Register TreeDataProvider
  const weiBoTreeDataProvider = new WeiBoTreeDataProvider()
  window.registerTreeDataProvider('HotNews-WeiBo', weiBoTreeDataProvider)

  // Register Command
  commands.registerCommand('WebView-WeiBo', (title: string, category: string, link: string) => {
    WebViewStash.get('weiBoWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('weiBoWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  commands.registerCommand('WeiBoHotNews.refresh', () => {
    weiBoTreeDataProvider.refresh()
  })

  context.subscriptions.push()
}

export function deactivate() { }
