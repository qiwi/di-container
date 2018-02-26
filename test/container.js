import chai from 'chai'
import dirtyChai from 'dirty-chai'
import Container from '../src/container'
import Provider from '../src/provider'

const {expect} = chai
chai.use(dirtyChai)

describe('container', () => {
  it('constructs proper instance', () => {
    const container = new Container({})

    expect(container).to.be.instanceof(Container)
    expect(container.provider).to.be.instanceof(Provider)
    expect(container.opts).not.to.be.undefined()
  })

  describe('proto', () => {

  })
  describe('static', () => {
    describe('getResolver', () => {
      it('returns proper resolver by type', () => {})
      it('returns default resolver otherwise', () => {})
    })
  })
})
