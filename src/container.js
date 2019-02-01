// @flow
import Provider from './provider'
import {
  REFERENCE,
  FACTORY,
  CONSTRUCTOR,
  getResolver
} from './resolver'

import {
  immutable as immutableInterceptor,
  singleton as singletonInterceptor
} from './interceptors'
import { composeFactories } from './util'

import type {
  IContainerOpts,
  IContainer,

  IContainedEntity,
  IContainedOpts,
  IProvider,
  IInstance
} from './interface'

/**
 * @class Container
 * @implements IContainer
 */
export default class Container implements IContainer {
  opts: IContainerOpts
  provider: IProvider
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
    this.provider = new Provider()

    return this
  }

  /**
   * Registers factories.
   * @return {IContainer}
   */
  register (entity: IContainedEntity, opts: ?IContainedOpts): IContainer {
    const { type, deps, singleton = false, immutable = false } = { ...this.opts, ...opts }
    const resolver = composeFactories(
      getResolver(type),
      immutable ? immutableInterceptor : null,
      singleton ? singletonInterceptor : null
    )

    // $FlowFixMe
    this.provider.register(entity, deps || [], resolver)

    return this
  }

  /**
   * Gets entity.
   * @param {*} track
   * @returns {IInstance}
   */
  get (track: IContainedEntity): IInstance {
    return this.provider.resolve(track)
  }
}

export {
  REFERENCE,
  FACTORY,
  CONSTRUCTOR,
  REFERENCE as VALUE,
  FACTORY as FUNCTION,
  CONSTRUCTOR as CLASS
}
