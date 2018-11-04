/* eslint-env mocha */
const expect = require('chai').expect
const server = require('./server').listen()
const request = require('supertest').agent(server)

describe('貼文測試', function () {
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

  describe('GET /Jack/posts', function () { // listpost
    it('內文標題應該為《貼文列表》，而且只有 0 則貼文', function (done) {
      request.get('/Jack/posts').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<title>貼文列表</title>')
        expect(res.text).to.include('<p>您總共有 <strong>0</strong> 則貼文!</p>')
        done()
      })
    })
  })

  describe('GET /Jack/post/new', function () { // add
    it('未登入，不可創建新貼文', function (done) {
      request
      .expect(401, function (err, res) {
        if (err) return done(err)

        expect(res.header.location).to.equal('/login')
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

  describe('GET /Jack/post/new', function () { // add
    it('已登入，可以新增貼文', function (done) {
      request.get('/Jack/post/new').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<title>新增貼文</title>')
        expect(res.text).to.include('<h1>新增貼文</h1>')
        expect(res.text).to.include('<form action="/Jack/post" method="post">')
        done()
      })
    })
  })

  describe('POST /Jack/post', function () { // create
    it('應該會創建新貼文，然後轉址到使用者版面 /Jack/posts', function (done) {
      request
        .post('/Jack/post')
        .send({ title: '貼文 0', body: '內容 0' })
        .end(function (err, res) {
          if (err) return done(err)

          expect(res.header.location).to.equal('/Jack/posts')
          done()
        })
    })
  })

  describe('GET /Jack/post/0', function () { // show (檢視是否創建成功)
    it('應該會看到第 0 則貼文', function (done) {
      request.get('/Jack/post/0').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<h1>貼文 0</h1>')
        expect(res.text).to.include('<p>內容 0</p>')
        done()
      })
    })
  })
})
