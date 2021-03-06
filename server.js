const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')

const Koa = require('koa')
const app = (module.exports = new Koa())

let loginuser = false

app.use(logger())
app.use(koaBody())

router
  .get('/', list)
  .get('/:user/posts', listpost)
  .get('/:user/post/new', add)
  .get('/:user/post/:id', show)
  .get('/:user/edit/:id', edit)
  .get('/:user/delete/:id', del)
  .get('/signup', signup)
  .get('/login', login)
  .post('/:user/post', create)
  .post('/:user/modify/:id', modify)
  .post('/check', check)
  .post('/enter', enter)
  .post('/search', search)

app.use(router.routes())

async function list (ctx) {
  const posts = M.list()
  const users = M.getuser()
  ctx.body = await V.list(posts, users, loginuser)
}

async function listpost (ctx) {
  const user = ctx.params.user
  const posts = M.listpost(user)
  ctx.body = await V.listpost(posts, user)
}

async function add (ctx) {
  const user = ctx.params.user
  ctx.body = await V.new(user)
}

async function show (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(post)
}

async function create (ctx) {
  const post = ctx.request.body
  const user = ctx.params.user
  M.add(post, user)
  ctx.redirect(`/${user}/posts`)
}

async function edit (ctx) {
  const user = ctx.params.user
  const id = ctx.params.id
  const post = M.get(id)
  ctx.body = await V.edit(post, user)
}

async function modify (ctx) {
  const post = ctx.request.body
  const user = ctx.params.user
  const id = ctx.params.id
  M.modify(post, user, id)
  ctx.redirect(`/${user}/post/${id}`)
}

async function del (ctx) {
  const user = ctx.params.user
  const id = ctx.params.id
  M.del(user, id)
  ctx.redirect(`/${user}/posts`)
}

async function signup (ctx) {
  ctx.body = await V.signup()
}

async function check (ctx) {
  const user = ctx.request.body
  if (M.check(user)) {
    ctx.status = 401
    ctx.body = '<p>使用者已存在，請重新<a href="/signup">註冊</a></p>'
  } else {
    ctx.redirect('/login')
  }
}

async function login (ctx) {
  ctx.body = await V.login()
}

async function enter (ctx) {
  const user = ctx.request.body
  if (M.login(user)) {
    loginuser = user.account
    ctx.redirect('/')
  } else {
    ctx.status = 401
    ctx.body = '<p>登入失敗，請重新<a href="/login">登入</a></p>'
  }
}

async function search (ctx) {
  const target = ctx.request.body
  const result = M.search(target)
  if (!result) ctx.throw(404, 'not found')
  ctx.body = await V.searchresult(result)
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
