import chai from 'chai'
import dirtyChai from 'dirty-chai'
import Provider from '../src/provider'

const {expect} = chai
chai.use(dirtyChai)

describe('provider', () => {
  it('constructs proper instance', () => {
    const provider = new Provider({})

    expect(provider).to.be.instanceof(Provider)
    expect(provider.stack).to.be.instanceof(Array)
  })

  describe('proto', () => {
    describe('register', () => {
      it('property adds new entry to inner stack', () => {
        const provider = new Provider()

        class Foo {
        }

        const factory = (Type, deps) => new Type(...deps)

        expect(provider.register(Foo, [], factory)).to.equal(provider)
        expect(provider.stack.length).to.equal(1)
        expect(provider.stack[0]).to.deep.include({
          type: Foo,
          deps: [],
          factory
        })
      })

      it('prevents duplicate declaration', () => {
        const provider = new Provider()

        class Foo {
        }

        const factory = (Type, deps) => new Type(...deps)
        provider.register(Foo, [], factory)

        expect(() => provider.register(Foo, [], factory)).to.throw('Provider.register: duplicate declaration Foo')

      })
    })

    describe('resolve', () => {
      let provider

      beforeEach(() => {
        provider = new Provider()
      })

      it('throws error if target type is not specified', () => {
        expect(provider.resolve).to.throw('Provider.resolve: type must be defined')
      })

      it('construct entry with no deps', () => {
        class Foo {}

        const factory = (Type, deps) => new Type(...deps)

        provider.register(Foo, [], factory)

        expect(provider.resolve(Foo)).to.be.instanceof(Foo)
      })

      it('constructs instance with deps tree', () => {
        class Bar {}
        class Foo {
          constructor (bar) {
            this.bar = bar
          }
        }

        const factory = (Type, deps) => new Type(...deps)

        provider.register(Foo, [Bar], factory)
        provider.register(Bar, [], factory)

        const foo = provider.resolve(Foo)

        expect(foo).to.be.instanceof(Foo)
        expect(foo.bar).to.be.instanceof(Bar)
      })

      it('throws error if dependency is not found', () => {
        class Bar {}
        class Foo {
          constructor (bar) {
            this.bar = bar
          }
        }

        const factory = (Type, deps) => new Type(...deps)

        provider.register(Foo, [Bar], factory)

        expect(() => provider.resolve(Foo)).to.throw('Provider.resolve: Bar type not found in the registered stack')
      })
    })
  })

  describe('static', () => {
    describe('getTypeName', () => {
      it('returns proper class name', () => {
        class Foo {}
        function Bar () {}

        expect(Provider.getTypeName(Foo)).to.equal('Foo')
        expect(Provider.getTypeName(Bar)).to.equal('Bar')
        expect(Provider.getTypeName(() => {})).to.equal('')
      })
    })
  })
})
