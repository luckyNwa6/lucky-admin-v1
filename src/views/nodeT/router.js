let express = require('express') //使用Express的路由，最简单是直接挂载再app上，不过不好
let router = express.Router()

router.get('/router/get', (req, res) => {
  res.send('router list get ')
})

router.post('/router/post', (req, res) => {
  res.send('router list post ')
})

module.exports = router
