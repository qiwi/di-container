import chai from 'chai'
import dirtyChai from 'dirty-chai'
import { composeFactories } from '../src/util'

const {expect} = chai
chai.use(dirtyChai)

describe('composeFactories', () => {
  it('produces composed handler', () => {
    const foo = (handler) => (...args) => {
      const res = handler(...args)
      res.foo = 'foo'

      return res
    }
    const bar = (handler) => (...args) => {
      const res = handler(...args)
      res.bar = 'bar'

      return res
    }
    const baz = () => ({baz: 'baz'})
    const qux = null
    const composed = composeFactories(qux, baz, qux, bar, qux, foo)
    const value = composed()

    expect(value.foo).to.equal('foo')
    expect(value.bar).to.equal('bar')
    expect(value.baz).to.equal('baz')
  })
})
