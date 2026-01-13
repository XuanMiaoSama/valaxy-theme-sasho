/**
 * 今日诗词 API 类型声明
 * Type declarations for jinrishici module
 */

declare module 'jinrishici' {
  export interface JinrishiciResult {
    status: string
    data: {
      id: string
      content: string
      popularity: number
      origin: {
        title: string
        dynasty: string
        author: string
        content: string[]
        translate?: string[]
      }
      matchTags: string[]
      recommendedReason: string
      cacheAt: string
    }
  }

  export interface JinrishiciError {
    errMessage: string
  }

  export function load(
    success: (result: JinrishiciResult) => void,
    error?: (err: JinrishiciError) => void,
  ): void
}
