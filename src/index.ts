import type { ExtensionContext } from 'vscode'
import { Uri, ViewColumn, commands, env, window } from 'vscode'
import { JueJinTreeDataProvider } from './provider/JueJinTreeData'
import { getWebViewContainerContent } from './webview'
import { WeiBoTreeDataProvider, ZhiHuTreeDataProvider } from './provider'

const WebViewStash = new Map()

export function activate(context: ExtensionContext) {
  // One：Register TreeDataProvider
  const weiBoTreeDataProvider = new WeiBoTreeDataProvider()
  const weiBoProvider = window.registerTreeDataProvider('HotNews-WeiBo', weiBoTreeDataProvider)

  const zhiHuTreeDataProvider = new ZhiHuTreeDataProvider()
  const zhiHuProvider = window.registerTreeDataProvider('HotNews-ZhiHu', zhiHuTreeDataProvider)

  const jueJinTreeDataProvider = new JueJinTreeDataProvider()
  const jueJinProvider = window.registerTreeDataProvider('HotNews-JueJin', jueJinTreeDataProvider)

  const treeDataProviderList = [weiBoProvider, zhiHuProvider, jueJinProvider]

  // Two：Register WebView Command
  const weiBoWebView = commands.registerCommand('WebView-WeiBo', (title: string, category: string, link: string) => {
    WebViewStash.get('weiBoWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('weiBoWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  const zhiHuWebView = commands.registerCommand('OpenLink-ZhiHu', (title: string, link: string) => {
    env.openExternal(Uri.parse(link))
  })

  const jueJinWebView = commands.registerCommand('WebView-JueJi', (title: string, category: string, link: string) => {
    WebViewStash.get('jueJinWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('jueJinWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  const webviewLinkList = [weiBoWebView, zhiHuWebView, jueJinWebView]

  // Three：Register Refresh Command
  const weiBoRefresh = commands.registerCommand('WeiBoHotNews.refresh', () => {
    weiBoTreeDataProvider.refresh()
  })

  const zhiHuRefresh = commands.registerCommand('ZhiHuNews.refresh', () => {
    zhiHuTreeDataProvider.refresh()
  })

  const jueJinRefresh = commands.registerCommand('JueJinNews.refresh', () => {
    jueJinTreeDataProvider.refresh()
  })

  const refreshBtnList = [weiBoRefresh, zhiHuRefresh, jueJinRefresh]
  context.subscriptions.push(...treeDataProviderList, ...webviewLinkList, ...refreshBtnList)
}

export function deactivate() { }
