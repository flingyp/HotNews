import type { ExtensionContext } from 'vscode'
import { Uri, ViewColumn, commands, env, window } from 'vscode'
import { getWebViewContainerContent } from './webview'
import { WeiBoTreeDataProvider, ZhiHuTreeDataProvider } from './provider'

const WebViewStash = new Map()

export function activate(context: ExtensionContext) {
  // Register TreeDataProvider
  const weiBoTreeDataProvider = new WeiBoTreeDataProvider()
  const treeDataProviderOne = window.registerTreeDataProvider('HotNews-WeiBo', weiBoTreeDataProvider)

  const zhiHuTreeDataProvider = new ZhiHuTreeDataProvider()
  const treeDataProviderTwo = window.registerTreeDataProvider('HotNews-ZhiHu', zhiHuTreeDataProvider)

  // Register Command
  const registerCommandOne = commands.registerCommand('WebView-WeiBo', (title: string, category: string, link: string) => {
    WebViewStash.get('weiBoWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('weiBoWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  const registerCommandTwo = commands.registerCommand('OpenLink-ZhiHu', (title: string, link: string) => {
    env.openExternal(Uri.parse(link))
  })

  const registerCommandThree = commands.registerCommand('WeiBoHotNews.refresh', () => {
    weiBoTreeDataProvider.refresh()
  })

  const registerCommandFour = commands.registerCommand('ZhiHuNews.refresh', () => {
    zhiHuTreeDataProvider.refresh()
  })

  context.subscriptions.push(treeDataProviderOne, treeDataProviderTwo, registerCommandOne, registerCommandTwo, registerCommandThree, registerCommandFour)
}

export function deactivate() { }
