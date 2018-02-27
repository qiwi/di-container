import chai from 'chai'
import dirtyChai from 'dirty-chai'
import Container, {CLASS, FACTORY, REFERENCE, CONSTRUCTOR} from '../src/container'
import Provider from '../src/provider'

const {expect} = chai
chai.use(dirtyChai)

describe('container', () => {
  it('constructs proper instance', () => {
    const opts = {}
    const container = new Container(opts)

    expect(container).to.be.instanceof(Container)
    expect(container.provider).to.be.instanceof(Provider)
    expect(container.opts).to.equal(opts)
  })

  describe('proto', () => {
    let container
    class Foo {}
    const ref = { bar: 'qux' }
    const factory = () => {
      const foo = new Foo()
      foo.bar = ref
      return foo
    }

    beforeEach(() => {
      container = new Container()
    })

    describe('register', () => {
      it('as constructor', () => {
        container.register(Foo, { type: CLASS })
        const foo = container.provider.resolve(Foo)

        expect(foo).to.be.instanceof(Foo)
      })

      it('as reference', () => {
        container.register(ref, { type: REFERENCE })
        const foo = container.provider.resolve(ref)

        expect(foo).to.equal(ref)
      })

      it('as factory', () => {
        container.register(factory, { type: FACTORY })
        const foo = container.provider.resolve(factory)

        expect(foo).to.be.instanceof(Foo)
        expect(foo.bar).to.equal(ref)
      })

      it('as immutable', () => {
        container.register(Foo, { type: CLASS, singleton: true })
        const foo = container.provider.resolve(Foo)
        const bar = container.provider.resolve(Foo)

        expect(foo).to.equal(bar)
      })

      it('as singleton', () => {
        container.register(Foo, { type: CLASS, immutable: true })
        const foo = container.provider.resolve(Foo)

        expect(foo).to.be.instanceof(Foo)
        expect(() => { foo.bar = 'baz' }).to.throw('Cannot add property bar, object is not extensible')
      })
    })

    describe('get', () => {
      it('resolves instance with its deps', () => {
        class Bar {
          baz () { return 'qux' }
        }
        class Foo {
          constructor (bar) {
            this.bar = bar
          }
        }
        class Qux {
          constructor (factory, ref, bar, foo) {
            this.f = factory
            this.ref = ref
            this.bar = bar
            this.foo = foo
          }
        }
        const ref = { bar: 'qux' }
        const factory = () => {
          const foo = new Foo()
          foo.ref = ref
          return foo
        }

        const container = new Container()

        container.register(ref, { type: REFERENCE })
        container.register(factory, { type: FACTORY })
        container.register(Bar, {type: CLASS, singleton: true})
        container.register(Foo, {deps: [Bar], type: CLASS})
        container.register(Qux, {deps: [factory, ref, Bar, Foo], type: CONSTRUCTOR})

        const qux = container.get(Qux)

        expect(qux).to.be.instanceof(Qux)
        expect(qux.f).to.be.instanceof(Foo)
        expect(qux.f.ref).to.equal(ref)
        expect(qux.bar).to.be.instanceof(Bar)

        expect(qux.foo).to.be.instanceof(Foo)
        expect(qux.bar).to.equal(qux.foo.bar)
      })
    })

    it('throws error if dependency is not found', () => {
      class Bar {}
      class Foo {
        constructor (bar) {
          this.bar = bar
        }
      }
      container.register(Foo, { deps: [Bar], type: CLASS })

      expect(() => container.get(Foo)).to.throw('Provider.resolve: Bar type not found in the registered stack')
    })
  })
})
