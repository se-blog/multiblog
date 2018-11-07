const M = module.exports = {}

const posts = []
const users = []
let index = 0

M.add = function (post, user) {
  const id = index
  post.created_at = new Date()
  post.id = id.toString()
  post.owner = user
  posts.push(post)
  index++
}

M.get = function (id) {
  for (let post of posts) {
    if (post.id === id) {
      return post
    }
  }
}

M.list = function () {
  return posts
}

M.listpost = function (user) {
  let list = []
  for (let post of posts) {
    if (post.owner === user) {
      list.push(post)
    }
  }
  return list
}

M.getuser = function () {
  return users
}
