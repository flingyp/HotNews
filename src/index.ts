import { window } from 'vscode'
import { WeiBoTreeDataProvider } from './provider'

export function activate() {
  window.showInformationMessage('Hello')

  // Register TreeDataProvider
  window.registerTreeDataProvider('HotNews-WeiBo', new WeiBoTreeDataProvider())
}

export function deactivate() {

}
