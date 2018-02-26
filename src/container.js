// @flow
import Provider from './provider'
import {
  REFERENCE,
  FACTORY,
  INSTANCE,
  asFactory,
  asInstance,
  asReference
} from './resolver'

import type {
  IContainerOpts,
  IContainer,

  IContainedType,
  IContainedEntity,
  IContainedOpts,
  IProvider, IInstance
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
    const {type, deps, singleton=false, immutable=false} = {...this.opts, ...opts}
    const resolver = this.constructor.getResolver(type)

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

  /**
   *
   * @param type
   * @returns {Function}
   */
  static getResolver(type: ?IContainedType) {
    switch (type) {
      case FACTORY:
        return asFactory
      case INSTANCE:
        return asInstance
      case REFERENCE:
      default:
        return asReference
    }
  }
}
