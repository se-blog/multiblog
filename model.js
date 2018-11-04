const M = module.exports = {}

const posts = []
const users = []

M.add = function (post, user) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id.toString()
  post.owner = user
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
