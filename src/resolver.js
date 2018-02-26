// @flow

import type {
  IInstanceDeps,
  IInstanceType
} from './interface'

export const REFERENCE = 'REFERENCE'
export const INSTANCE = 'INSTANCE'
export const FACTORY = 'FACTORY'

export function asReference(type: IInstanceType) {
  return type
}

export function asInstance(type: IInstanceType, deps: IInstanceDeps) {
  return new (Function.prototype.bind.call(type, null, ...deps));
}

export function asFactory(type: IInstanceType, deps: IInstanceDeps) {
  return type(...deps)
}
