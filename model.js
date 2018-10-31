const M = module.exports = {}

const blog = [{'account': 'Jack', posts: []},
              {'account': 'Merry', posts: []},
              {'account': 'Ben', posts: []}]

M.add = function (post, user) {
  for (let i of blog) {
    if (blog[i].account === user) {
      const id = blog[i].posts.push(post) - 1
      post.created_at = new Date()
      post.id = id
    }
  }
}

M.get = function (id, user) {
  for (let i of blog) {
    if (blog[i].account === user) {
      return blog[i].posts[id]
    }
  }
}

M.list = function () {
  return blog
}

M.listpost = function (user) {
  for (let i of blog) {
    if (i.account === user) {
      return i.posts
    }
  }
}
