const userList = {
  url: '/user/list', // 正则匹配
  type: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: 1,
          username: 'userList0',
          password: '123456',
        },
        {
          id: 2,
          username: 'userList00',
          password: '666666',
        },
      ],
    }
  },
}

const userList1 = {
  url: '/user/list1', // 字符串写死，这种写法会无法匹配带参数的get请求
  type: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: 1,
          username: 'userList111',
          password: '123456',
        },
        {
          id: 2,
          username: 'userList11',
          password: '666666',
        },
      ],
    }
  },
}

module.exports = [userList, userList1]
