// @flow

import type {
  IContainerOpts,
  IContainer
} from './interface'

/**
 * @class Container
 * @implements IContainer
 */
export default class Container implements IContainer {

  opts: IContainerOpts

  /**
   * Constructs DI container.
   * @param {IContainerOpts} opts
   * @returns {Container}
   */
  constructor (opts: IContainerOpts): IContainer {
    /**
     * @private
     * @type {IContainerOpts}
     * @readonly
     */
    this.opts = opts

    return this
  }
}
