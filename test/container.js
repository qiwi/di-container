import chai from 'chai'
import dirtyChai from 'dirty-chai'
import Container from '../src/container'

const {expect} = chai
chai.use(dirtyChai)

describe('container', () => {
  it('constructs proper instance', () => {
    const container = new Container({})

    expect(container).to.be.instanceof(Container)
    expect(container.opts).not.to.be.undefined()
  })
})
