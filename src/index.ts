import type { ExtensionContext } from 'vscode'
import { Uri, ViewColumn, commands, env, window } from 'vscode'
import { JueJinTreeDataProvider } from './provider/JueJinTreeData'
import { getWebViewContainerContent } from './webview'
import { BaiDuTreeDataProvider, WeiBoTreeDataProvider, ZhiHuTreeDataProvider } from './provider'

const WebViewStash = new Map()

export function activate(context: ExtensionContext) {
  // One：Register TreeDataProvider
  const weiBoTreeDataProvider = new WeiBoTreeDataProvider()
  const weiBoProvider = window.registerTreeDataProvider('HotNews-WeiBo', weiBoTreeDataProvider)

  const zhiHuTreeDataProvider = new ZhiHuTreeDataProvider()
  const zhiHuProvider = window.registerTreeDataProvider('HotNews-ZhiHu', zhiHuTreeDataProvider)

  const jueJinTreeDataProvider = new JueJinTreeDataProvider()
  const jueJinProvider = window.registerTreeDataProvider('HotNews-JueJin', jueJinTreeDataProvider)

  const baiDuTreeDataProvider = new BaiDuTreeDataProvider()
  const baiDuProvider = window.registerTreeDataProvider('HotNews-BaiDu', baiDuTreeDataProvider)

  const treeDataProviderList = [weiBoProvider, zhiHuProvider, jueJinProvider, baiDuProvider]

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

  const jueJinWebView = commands.registerCommand('WebView-JueJin', (title: string, category: string, link: string) => {
    WebViewStash.get('jueJinWebView')?.dispose()

    const panel = window.createWebviewPanel('weiBoWebView', `${title}-${category}`, ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true })

    WebViewStash.set('jueJinWebView', panel)

    panel.webview.html = getWebViewContainerContent(link)
  })

  const baiDuWebView = commands.registerCommand('WebView-BaiDu', (title: string, link: string) => {
    env.openExternal(Uri.parse(link))
  })

  const webviewLinkList = [weiBoWebView, zhiHuWebView, jueJinWebView, baiDuWebView]

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

  const baiDuRefresh = commands.registerCommand('BaiDuNews.refresh', () => {
    baiDuTreeDataProvider.refresh()
  })

  const refreshBtnList = [weiBoRefresh, zhiHuRefresh, jueJinRefresh, baiDuRefresh]
  context.subscriptions.push(...treeDataProviderList, ...webviewLinkList, ...refreshBtnList)

  window.showInformationMessage('⭐️⭐️⭐️ HotNews is activated!')
}

export function deactivate() { }
