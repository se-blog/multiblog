const M = module.exports = {}

const blog = [{'account': 'Jack', posts: []},
              {'account': 'Merry', posts: []},
              {'account': 'Ben', posts: []}]

M.add = function (post, user) {
  for (let owner of blog) {
    if (owner.account === user) {
      const id = owner.posts.push(post) - 1
      post.created_at = new Date()
      post.id = id
    }
  }
}

M.get = function (id, user) {
  for (let owner of blog) {
    if (owner.account === user) {
      return owner.posts[id]
    }
  }
}

M.list = function () {
  return blog
}

M.listpost = function (user) {
  for (let owner of blog) {
    if (owner.account === user) {
      return owner.posts
    }
  }
}

M.editwell = function (post, user, id) {
  for (let target of blog) {
    if (target.account === user) {
      let OldPost = target.posts[id]
      post.created_at = OldPost.created_at
      target.posts[id] = post
    }
  }
}

M.del = function (user, id) {
  for (let owner of blog) {
    if (owner.account === user) {
      if (owner.posts[id]) {
        owner.posts.splice(id, 1)
      }
    }
  }
}
