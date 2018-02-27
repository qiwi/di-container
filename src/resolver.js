// @flow

import type {
  IContainedType,
  IInstanceDeps,
  IInstanceType,
  IInstance
} from './interface'

export const REFERENCE = 'REFERENCE'
export const CONSTRUCTOR = 'CONSTRUCTOR'
export const FACTORY = 'FACTORY'

export function asReference (type: IInstanceType): IInstance {
  return type
}

export function asConstructor (Type: IInstanceType, deps: IInstanceDeps): IInstance {
  return new Type(...deps)
}

export function asFactory (type: IInstanceType, deps: IInstanceDeps): IInstance {
  return type(...deps)
}

/**
 * Returns resolver by type.
 * @param {string} type
 * @returns {Function}
 */
export function getResolver (type: ?IContainedType): Function {
  switch (type) {
    case FACTORY:
      return asFactory
    case CONSTRUCTOR:
      return asConstructor
    case REFERENCE:
    default:
      return asReference
  }
}
