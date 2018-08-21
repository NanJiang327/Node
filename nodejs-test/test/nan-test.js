const chai = require('chai');
const assert = chai.assert
const should = chai.should()
const expect = chai.expect

describe('NanDemo',function () {
  describe('Nan-method 1', function(){
    before(function(){
      console.log('测试前 ----');
    })

    after(function() {
      console.log('测试后 ---');
    })

    beforeEach(function(){
      console.log('每条测试前 ----');
    })

    afterEach(function() {
      console.log('每条测试后 ---');
    })

    context('情景 1', function () {
      it('测试 1', function(){

      })

      it('使用assert风格的断言测试', function(){
          var value = 'hello'
          assert.typeOf(value,'string')
          assert.equal(value,'hello')
          assert.lengthOf(value, 5)
      })

      it('使用should风格的断言测试', function(){
          var value = 'hello'
          value.should.exist.and.be.a('string')
          value.should.equal('hello')
          value.should.not.equal('world')
          value.should.have.length(5)
      })

      it('使用expect风格的断言测试', function(){
          var value = 'hello'
          var number = 3

          expect(number).to.be.at.most(5);
          expect(number).to.be.at.least(3);
          expect(number).to.be.within(1,3);

          expect(value).to.exist
          expect(value).to.be.a('string')
          expect(value).to.not.equal('world')
      })
    })

  })
})
