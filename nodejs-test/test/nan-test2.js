const chai = require('chai')
const expect = chai.expect;
const NanDemo = require('../lib/nan-demo')

var demo = new NanDemo();

describe('NanDemo 2', function() {
  // 设置延迟
  this.timeout(10000)

  it('单价是10块的3件商品小计金额应该是30块', function(){
    var subtotal = demo.subtotal(10, 3)
    expect(subtotal).to.equal(30)
  })

  it('一段时间后返回数据', function(done) {
    demo.waitTwoSecond('hello', function(data){
      expect(data).to.equal('hello')
      done()
    })
  })

  it('加载豆瓣api 返回的内容里应该包含subjects 属性', function(done){
    demo.fetchData('top250', function(data){
      expect(data).to.have.property('subjects')
      done()
    })
  })
})
