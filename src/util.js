// @flow

import type {IFactorySequence, IFactory} from './interface'

/**
 * Produces composed handler from factories
 * @param {Function[]} factories
 * @returns {Function}
 */
export function composeFactories (...factories: IFactorySequence): ?IFactory {
  return factories.reduce((memo: ?IFactory, factory: ?IFactory): ?IFactory => {
    if (typeof factory !== 'function') {
      return memo
    }

    if (memo) {
      return factory(memo)
    }

    return factory
  })
}
