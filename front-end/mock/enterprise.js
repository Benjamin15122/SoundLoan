export default {
  'GET /infoMan/entProductComment': {
    success: true,
    message: '',
    content: [{
      'comment': '评...论...内...容..评...论...内...容',
      'product_id': 1,
      'product_name': '金利来小额贷',
      'score': 1,
      'user_id': 1,
      'user_name': 'Bad man'
    }, {
      'comment': '评...论...内...容..评...论...内...容',
      'product_id': 1,
      'product_name': '金利来小额贷',
      'score': 4,
      'user_id': 2,
      'user_name': 'bad girl'
    }, {
      'comment': '评...论...内...容..评...论...内...容',
      'product_id': 2,
      'product_name': '要你命3000贷',
      'score': 3,
      'user_id': 1,
      'user_name': 'bad girl'
    }, {
      'comment': '评...论...内...容..评...论...内...容',
      'product_id': 2,
      'product_name': '要你命3000贷',
      'score': 4,
      'user_id': 2,
      'user_name': 'bad girl'
    }]
  },
  'POST /infoMan/addCommentComplain': {
    success: true,
  }
}
