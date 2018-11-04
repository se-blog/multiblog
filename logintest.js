/* eslint-env mocha */
const expect = require('chai').expect
const server = require('./server').listen()
const request = require('supertest').agent(server)

describe('登入測試', function () {
  after(function () {
    server.close()
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

  describe('GET /login', function () { // login
    it('內文標題應該為《登入帳號》', function (done) {
      request.get('/login').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<title>登入帳號</title>')
        expect(res.text).to.include('<h1>登入</h1>')
        expect(res.text).to.include('<form action="/enter" method="post">')
        done()
      })
    })
  })

  describe('POST /enter', function () { // 登入失敗
    it('登入失敗', function (done) {
      request
        .post('/enter')
        .send({ account: 'Jack', password: 'abc123' })
        .expect(401, function (err, res) {
          if (err) return done(err)

          expect(res.header.location).to.equal('/login')
          done()
        })
    })
  })

  describe('POST /enter', function () { // 登入成功
    it('成功登入', function (done) {
      request
        .post('/enter')
        .send({ account: 'Jack', password: '123' })
        .end(function (err, res) {
          if (err) return done(err)

          expect(res.header.location).to.equal('/')
          done()
        })
    })
  })
})
