/* eslint-env mocha */
const expect = require('chai').expect
const server = require('./server').listen()
const request = require('supertest').agent(server)

describe('註冊測試', function () {
  after(function () {
    server.close()
  })

  describe('GET /', function () { // list
    it('內文標題應該為《版面列表》，而且只有 0 個版面', function (done) {
      request.get('/').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<title>版面列表</title>')
        expect(res.text).to.include('<p>您總共有 <strong>0</strong> 個版面!</p>')
        expect(res.text).to.include('<p><a href="/signup">註冊</a> <a href="/login">登入</a></p>')
        done()
      })
    })
  })

  describe('GET /signup', function () { // signup
    it('內文標題應該為《註冊帳號》', function (done) {
      request.get('/signup').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<title>註冊帳號</title>')
        expect(res.text).to.include('<h1>註冊</h1>')
        expect(res.text).to.include('<form action="/check" method="post">')
        done()
      })
    })
  })

  describe('POST /check', function () { // 帳號不存在
    it('檢查使用者不存在', function (done) {
      request
        .post('/check')
        .send({ account: 'Jack', password: '123' })
        .end(function (err, res) {
          if (err) return done(err)

          expect(res.header.location).to.equal('/')
          done()
        })
    })
  })

  describe('POST /check', function () { // 用同一個帳號重複註冊
    it('檢查使用者已存在', function (done) {
      request
        .post('/check')
        .send({ account: 'Jack', password: 'abc123' })
        .expect(401, function (err, res) {
          if (err) return done(err)

          expect(res.header.location).to.equal('/signup')
          done()
        })
    })
  })

  describe('GET /', function () { // list
    it('內文標題應該為《版面列表》，而且只有 1 個版面', function (done) {
      request.get('/').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<title>版面列表</title>')
        expect(res.text).to.include('<p>您總共有 <strong>1</strong> 個版面!</p>')
        expect(res.text).to.include('<p><a href="/signup">註冊</a> <a href="/login">登入</a></p>')
        done()
      })
    })
  })
})
