export default [
  {
    "commentId": 1,
    "parentId": null,
    "commet": "Tôi là comment root đầu tiên",
    "userId": 1,
    "username": "Oanh cute",
    "avatar": require('../assets/images/chef_2.png'),
    "isEdit": 1,
    "reply": [
      {
        "commentId": 2,
        "parentId": 1,
        "commet": "Tôi là comment children đầu tiên",
        "userId": 2,
        "isEdit": 0,
        "username": "Trung yêu quý",
        "avatar": require('../assets/images/chef_3.png'),
      },
      {
        "commentId": 3,
        "parentId": 1,
        "commet": "Tôi là comment children thứ hai",
        "userId": 1,
        "isEdit": 1,
        "username": "Oanh cute",
        "avatar": require('../assets/images/chef_2.png'),
      }
    ]
  },
  {
    "commentId": 2,
    "parentId": null,
    "commet": "Tôi là comment root thư hai",
    "userId": 3,
    "isEdit": 0,
    "username": "Trí trí",
    "avatar": null,
    "reply": []
  }
]
