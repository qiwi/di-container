// @flow

import type { IFactory } from './interface'

export function singleton (resolver: IFactory): IFactory {
  const memo = {}

  return (...args) => {
    if (memo.hasOwnProperty('result')) {
      return memo.result
    }
    memo.result = resolver(...args)

    return memo.result
  }
}

export function immutable (resolver: IFactory): IFactory {
  return (...args) => Object.freeze(resolver(...args))
}
