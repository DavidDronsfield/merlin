module.exports.routes = {
  'POST /user/create': 'UserController.create',
  'GET /user': 'UserController.index',
  'GET /user/:id': 'UserController.find',
  'POST /user/:id': 'UserController.update',
  'DELETE /user/:id': 'UserController.delete'
};