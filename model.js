const M = (module.exports = {})

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

M.modify = function (post, user, id) {
  for (let p of posts) {
    if (p.id == id && p.owner == user) {
      p.title = post.title
      p.body = post.body
      p.created_at = new Date()
      return
    }
  }
}

M.del = function (user, id) {
  for (var p = 0; p < posts.length; p++) {
    if (posts[p].owner == user && posts[p].id == id) {
      posts.splice(p, 1)
      return
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
