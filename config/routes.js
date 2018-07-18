module.exports.routes = {
  'POST /hoteluser': 'HotelUserController.create',
  'GET /hoteluser': 'HotelUserController.index',
  'GET /hoteluser/:id': 'HotelUserController.findOne',
  'POST /hoteluser/:id': 'HotelUserController.update',
  'DELETE /hoteluser/:id': 'HotelUserController.delete'
};