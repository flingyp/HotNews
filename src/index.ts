import type { ExtensionContext } from 'vscode'
import { Uri, ViewColumn, commands, env, window } from 'vscode'
import { JueJinTreeDataProvider } from './provider/JueJinTreeData'
import { getWebViewContainerContent } from './webview'
import { WeiBoTreeDataProvider, ZhiHuTreeDataProvider } from './provider'

const WebViewStash = new Map()

export function activate(context: ExtensionContext) {
  // Register TreeDataProvider
  const weiBoTreeDataProvider = new WeiBoTreeDataProvider()
  const treeDataProviderOne = window.registerTreeDataProvider('HotNews-WeiBo', weiBoTreeDataProvider)

  const zhiHuTreeDataProvider = new ZhiHuTreeDataProvider()
  const treeDataProviderTwo = window.registerTreeDataProvider('HotNews-ZhiHu', zhiHuTreeDataProvider)

  const jueJinTreeDataProvider = new JueJinTreeDataProvider()
  const treeDataProviderThree = window.registerTreeDataProvider('HotNews-JueJin', jueJinTreeDataProvider)

  // Register WebView Command
  const registerCommandOne = commands.registerCommand('WebView-WeiBo', (title: string, category: string, link: string) => {
    WebViewStash.get('weiBoWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('weiBoWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  const registerCommandTwo = commands.registerCommand('OpenLink-ZhiHu', (title: string, link: string) => {
    env.openExternal(Uri.parse(link))
  })

  const registerCommandThree = commands.registerCommand('WebView-JueJi', (title: string, category: string, link: string) => {
    WebViewStash.get('jueJinWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('jueJinWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  // Register Refresh Command
  const registerCommandFour = commands.registerCommand('WeiBoHotNews.refresh', () => {
    weiBoTreeDataProvider.refresh()
  })

  const registerCommandFive = commands.registerCommand('ZhiHuNews.refresh', () => {
    zhiHuTreeDataProvider.refresh()
  })

  const registerCommandSix = commands.registerCommand('JueJinNews.refresh', () => {
    jueJinTreeDataProvider.refresh()
  })

  context.subscriptions.push(treeDataProviderOne, treeDataProviderTwo, treeDataProviderThree, registerCommandOne, registerCommandTwo, registerCommandThree, registerCommandFour, registerCommandFive, registerCommandSix)
}

export function deactivate() { }
