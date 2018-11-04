const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.use(logger())
app.use(koaBody())

router
  .get('/', list)
  .get('/:user/posts', listpost)
  .get('/:user/post/new', add)
  .get('/:user/post/:id', show)
  .post('/:user/post', create)

app.use(router.routes())

async function list (ctx) {
  const posts = M.list()
  const users = M.getuser()
  ctx.body = await V.list(posts, users)
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
  ctx.redirect('/')
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
