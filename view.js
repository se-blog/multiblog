var V = (module.exports = {})

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
  <p><a href="/">首頁</a><p/>
  <form action="/search" method="post">
    <input type="text" name="search" style="font-size:.8em"><input type="submit" value="search" style="height:40px">
  </form>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

V.list = function (posts, users, login) {
  let content = `
  ${
    (() => {
      let html = ''
      if (login === false) {
        html += `
          <p><a href="/signup">註冊</a> <a href="/login">登入</a></p>
        `
      }
      return html
    }
    )()
  }
  <h1>版面列表</h1>
  <p>您總共有 <strong>${users.length}</strong> 個版面!</p>
  <p><a href="/${login}/post/new">創建新貼文</a></p>
  <ul id="posts">
  ${
    (() => {
      let html = ''
      for (let user of users) {
        let x = 0
        for (let post of posts) {
          if (post.owner === user.account) {
            x++
          }
        }
        html += `
          <li>
            <p><a href="/${user.account}/posts">${user.account}(${x})</a></p>
          </li>
        `
      }
      return html
    }
    )()
  }
  </ul>
  `
  return V.layout('版面列表', content)
}

V.listpost = function (posts, user) {
  let content = `
  <h1>貼文列表</h1>
  <p>您總共有 <strong>${posts.length}</strong> 則貼文!</p>
  <p><a href="/${user}/post/new">創建新貼文</a></p>
  <ul id="posts">
  ${(() => {
    let html = ''
    for (let post of posts) {
      html += `
          <li>
            <p><a href="/${post.owner}/post/${post.id}">${post.title}</a></p>
          </li>
        `
    }
    return html
  })()}
  </ul>
  `
  return V.layout('貼文列表', content)
}

V.new = function (user) {
  return V.layout(
    '新增貼文',
    `
  <h1>新增貼文</h1>
  <p>創建一則新貼文</p>
  <form action="/${user}/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `
  )
}

V.show = function (post) {
  return V.layout(
    post.title,
    `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <p><a href="/${post.owner}/edit/0">編輯</a> <a href="/${post.owner}/delete/0">刪除</a></p>
  `
  )
}

V.edit = function (post, user) {
  return V.layout(
    '編輯貼文',
    `
  <h1>編輯貼文</h1>
  <p>編輯一則新貼文</p>
  <form action="/${user}/modify/${post.id}" method="post">
    <p><input type="text" placeholder="Title" name="title" value="${post.title}"></p>
    <p><textarea name="body" value="${post.body}">${post.body}</textarea></p>
    <p><input type="submit" value="edit"></p>
  </form>
  `
  )
}

V.signup = function () {
  let content = `
   <h1>註冊</h1>
   <form action="/check" method="post">
    <p><input type="text" name="account"></p>
    <p><input type="password" name="password"></p>
    <p><input type="submit" value="註冊"</p>
   </form>
  `
  return V.layout('註冊帳號', content)
}

V.login = function () {
  let content = `
   <h1>登入</h1>
   <form action="/enter" method="post">
    <p><input type="text" name="account"></p>
    <p><input type="password" name="password"></p>
    <p><input type="submit" value="登入"</p>
   </form>
  `
  return V.layout('登入帳號', content)
}

V.searchresult = function (result) {
  let content = `
    <h1>搜尋結果</h1>
    <ul id="posts">
    ${(() => {
      let html = ''
      for (let post of result) {
        html += `
            <li>
              <p><a href="/${post.owner}/post/${post.id}">${post.title}</a></p>
            </li>
          `
      }
      return html
    })()}
    </ul>
    `
  return V.layout('貼文列表', content)
}
