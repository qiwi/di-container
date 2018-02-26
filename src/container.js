// @flow

import type {
  IContainerOpts,
  IContainer
} from './interface'

export default class Container implements IContainer{
  opts: IContainerOpts
  constructor(opts: IContainerOpts) {
    this.opts = opts

    return this
  }
}
