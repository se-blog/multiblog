const M = module.exports = {}

const blog = [{'account': 'Jack', posts: []},
              {'account': 'Merry', posts: []},
              {'account': 'Ben', posts: []}]

M.add = function (post, user) {
  for (var i = 0; i < blog.length; i++) {
    if (blog[i].account === user) {
      const id = blog[i].posts.push(post) - 1
      post.created_at = new Date()
      post.id = id
    }
  }
}

M.get = function (id, user) {
  for (var i = 0; i < blog.length; i++) {
    if (blog[i].account === user) {
      return blog[i].posts[id]
    }
  }
}

M.list = function () {
  return blog
}

M.listpost = function (user) {
  for (var i = 0; i < blog.length; i++) {
    if (blog[i].account === user) {
      return blog[i]
    }
  }
}
