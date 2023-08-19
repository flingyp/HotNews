import type { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'

export async function request(url: string, params: RequestInit) {
  const response = await fetch(url, params)
  const data = await response.json()
  return data
}

export * from './apis/getWeiBoData'
export * from './apis/getZhiHuData'
