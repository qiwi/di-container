import chai from 'chai'
import dirtyChai from 'dirty-chai'
import {
  CONSTRUCTOR,
  FACTORY,
  REFERENCE,
  getResolver,
  asConstructor,
  asFactory,
  asReference
} from '../src/resolver'

const {expect} = chai
chai.use(dirtyChai)

describe('resolver', () => {
  describe('getResolver', () => {
    it('returns proper resolver by type', () => {
      expect(getResolver(CONSTRUCTOR)).to.equal(asConstructor)
      expect(getResolver(FACTORY)).to.equal(asFactory)
      expect(getResolver(REFERENCE)).to.equal(asReference)
    })

    it('returns default resolver otherwise', () => {
      expect(getResolver()).to.equal(asReference)
    })
  })

  describe('asConstructor', () => {
    it('invokes registered type as constructor', () => {
      class Foo {
        constructor (bar, baz) {
          this.bar = bar
          this.baz = baz
        }
      }
      const bar = 'bar'
      const baz = 'baz'
      const foo = asConstructor(Foo, [bar, baz])

      expect(foo).to.be.instanceof(Foo)
      expect(foo.bar).to.be.equal(bar)
      expect(foo.baz).to.be.equal(baz)
    })

    it('throws exception if fails', () => {
      const Foo = null

      expect(() => asConstructor(Foo)).to.throw(Error)
    })
  })

  describe('asFactory', () => {
    it('calls registered type as regular function', () => {
      const bar = 'bar'
      const baz = 'baz'
      const foo = (bar, baz) => bar + baz

      expect(asFactory(foo, [bar, baz])).to.equal(bar + baz)
    })

    it('throws exception if fails', () => {
      const Foo = null

      expect(() => asFactory(Foo)).to.throw(Error)
    })
  })

  describe('asReference', () => {
    it('returns type value as is', () => {
      const bar = 'bar'
      const baz = 'baz'
      const foo = (bar, baz) => bar + baz

      expect(asReference(foo, [bar, baz])).to.equal(foo)
    })
  })
})
