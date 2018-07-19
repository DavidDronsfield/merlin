module.exports.routes = {
  'POST /hoteluser': 'HotelUserController.create',
  'GET /hoteluser': 'HotelUserController.index',
  'GET /hoteluser/:id': 'HotelUserController.findOne',
  'GET /hoteluser/match/:field/:value': 'HotelUserController.findByField',
  'POST /hoteluser/checkpassword': 'HotelUserController.checkPassword',
  'POST /hoteluser/:id': 'HotelUserController.update',
  'DELETE /hoteluser/:id': 'HotelUserController.delete'
};