const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')

const Koa = require('koa')
const app = (module.exports = new Koa())

const login = 'Jack'
let index = 0    // 'Jack' 'Merry' 'Ben'

app.use(logger())
app.use(koaBody())

router
  .get('/', list)
  .get('/:user/post/new', add)
  .get('/:user/posts', listpost)
  .get('/:user/post/:id', show)
  .get('/edit', edit)
  .get('/delete', del)
  .post('/:user/post', create)
  .post('/editwell', editwell)

app.use(router.routes())

async function list (ctx) {
  const blog = M.list()
  ctx.body = await V.list(blog, login)
}

async function add (ctx) {
  ctx.body = await V.new(login)
}

async function listpost (ctx) {
  const posts = M.listpost(login)
  ctx.body = await V.listpost(posts, login)
}

async function show (ctx) {
  const id = ctx.params.id
  index = id
  const post = M.get(id, login)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(post)
}

async function create (ctx) {
  const post = ctx.request.body
  M.add(post, login)
  ctx.redirect('/')
}

async function edit (ctx) {
  const post = M.get(index, login)
  ctx.body = await V.edit(post)
}

async function editwell (ctx) {
  const post = ctx.request.body
  const targetpost = M.get(index, login)
  targetpost.title = post.title
  targetpost.body = post.body
  M.editwell(targetpost, login, index)
  ctx.redirect(`/${login}/post/${index}`)
}

async function del (ctx) {
  M.del(login, index)
  ctx.redirect(`/${login}/posts`)
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
