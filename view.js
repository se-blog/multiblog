var V = module.exports = {}
const login = false

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

V.list = function (blog) {
  let list = []
  for (let user of blog) {
    list.push(`
      <li>
        <a href="${user.account}/posts"><p>${user.account}(${user.posts.length})</p></a>
      </li>
    `)
  }
  let content = `
  <h1>貼文列表</h1>
  <p>您總共有 <strong>${blog.length}</strong> 個版面!</p>
  ${
    (() => {
      let html = ''
      if (login) {
        html += `
        <p><a href="/${login}/post/new">創建新貼文</a></p>
        `
      }
      return html
    })()
}
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.layout('貼文列表', content)
}

V.listpost = function (blog) {
  let list = []
  for (let post of blog.posts) {
    list.push(`
      <li>
        <h2>${post.title}</h2>
        <p><a href="/${blog.account}/post/${post.id}">讀取貼文</a></p>
      </li>
    `)
  }
  let content = `
  <h1>貼文列表</h1>
  <p>您總共有 <strong>${blog.posts.length}</strong> 則貼文!</p>
  ${
    (() => {
      let html = ''
      if (login) {
        html += `
        <p><a href="/${blog.account}/post/new">創建新貼文</a></p>
        `
      }
      return html
    })()
}
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.layout('貼文列表', content)
}

V.new = function () {
  return V.layout('新增貼文', `
  <h1>新增貼文</h1>
  <p>創建一則新貼文</p>
  <form action="/${login}/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (post) {
  return V.layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `)
}
