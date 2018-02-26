// @flow

import type {
  IInstance,
  IInstanceDeps,
  IInstanceType,
  IInstanceDepsTypes,
  IInstanceFactory,
  IProvider,
  IProviderEntry,
  IProviderEntryStack
} from './interface'

/**
 * Produces scoped context for Container
 * @class Provider
 */
export default class Provider implements IProvider {
  stack: IProviderEntryStack;
  constructor () {
    // TODO Need a hashmap. Reflect metadata?
    this.stack = []
    return this
  }

  /**
   * Registers a new instance factory
   * @param {IInstanceType} type
   * @param {IInstanceDepsTypes} deps
   * @param {IInstanceFactory} factory
   * @returns {Provider}
   */
  register (type: IInstanceType, deps: IInstanceDepsTypes, factory: IInstanceFactory): IInstance {
    const entry: IProviderEntry = {
      type,
      deps,
      factory
    }

    this.stack.push(entry)

    return this
  }

  /**
   * Produces instance via found factory
   * @param {IInstanceType} type
   * @return {IInstance}
   * @throws {Error}
   */
  resolve (type: IInstanceType): IInstance {
    if (type === undefined || type === null) {
      throw new Error('Provider.resolve: type must be defined')
    }

    const entry = this.getEntryByType(type)

    if (!entry) {
      const name = this.constructor.getTypeName(type)
      throw new Error(`Provider.resolve: ${name} type not found in the registered stack`)
    }

    // TODO handle recursive deps
    const deps: IInstanceDeps = this.resolveDeps(entry.deps)

    return entry.factory(type, deps)
  }

  /**
   * Resolves instance constructor deps
   * @param {IInstanceDepsTypes} deps
   * @returns {IInstanceDeps}
   */
  resolveDeps (deps: IInstanceDepsTypes): IInstanceDeps {
    return deps.map(this.resolve.bind(this))
  }

  /**
   * Gets entry by type match
   * @param {IInstanceType} type
   * @returns {IProviderEntry/undefined}
   */
  getEntryByType (type: IInstanceType): ?IProviderEntry {
    const stack: IProviderEntryStack = this.stack

    for (let i = 0; i < stack.length; i++) {
      if (type === stack[i].type) {
        return stack[i]
      }
    }
  }

  /**
   * @param {IInstanceType} type
   * @returns {string}
   */
  static getTypeName (type: IInstanceType) {
    return type.name
  }
}
