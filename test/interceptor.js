import chai from 'chai'
import dirtyChai from 'dirty-chai'
import { singleton, immutable } from '../src/interceptors'

const {expect} = chai
chai.use(dirtyChai)

describe('singleton', () => {
  it('wraps class with singleton decorator', () => {
    class Foo {}
    const factory = () => new Foo()
    const composed = singleton(factory)

    const foo = composed()
    const bar = composed()

    expect(foo).to.equal(bar)
  })
})

describe('immutable', () => {
  it('freezes produced class instance', () => {
    class Foo {}
    const factory = () => new Foo()
    const composed = immutable(factory)

    const foo = composed()

    expect(() => { foo.bar = 'baz' }).to.throw('Cannot add property bar, object is not extensible')
  })
})
