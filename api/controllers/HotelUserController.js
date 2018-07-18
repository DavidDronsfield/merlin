const { toLowercase } = require('../../helpers/formatter');

module.exports = {

  create: (req, res, next) => {
    const email = toLowercase(req.param('email'));
    const password = req.param('password');
    const params = { email, password };
    new Promise((resolve, reject) => {
      HotelUser.create(params, (error, hotelUser) => {
        if (error) {
          reject(error)
        } else {
          resolve(hotelUser);
        }
      });
    })
      .then(user => res.status(200).json(user))
      .catch(next);
    
  },

  index: (req, res, next) => {
    new Promise((resolve, reject) => {
      const results = HotelUser.find().sort('email ASC').populateAll();
      if(results) {
        resolve(results)
      } else {
        const error = new Error('Internal server error');
        reject(error)
      }
    })
      .then(results => res.status(200).json(results))
      .catch(next);
  },

  findOne: (req, res, next) => {
    const id = req.param('id');
    new Promise((resolve, reject) => {
      const result = HotelUser.findOne({ id }).populateAll();
      if (result) {
        resolve(result);
      } else {
        const error = new Error('Internal server error')
        reject(error);
      }
    })
      .then(result => res.status(200).json(result))
      .catch(next);
  },

  findByField: (req, res, next) => {
    const field = req.param('field');
    let value = toLowercase(field) === 'email' ? toLowercase(req.param('value')) : req.param('value'); // Because emails are automatically stored in lowercase

    new Promise((resolve, reject) => {
      const results = HotelUser.find({ [field]: value }).sort('email ASC').populateAll();
      if(results) {
        resolve(results)
      } else {
        const error = new Error('Internal server error');
        reject(error)
      }
    })
      .then(results => res.status(200).json(results))
      .catch(next);
  },

  update: (req, res, next) => {
    const id = req.param('id');
    const params = req.params.all();
    new Promise((resolve, reject) => {
      const result = HotelUser.update(id, params)
      if (result) {
        resolve(result);
      } else {
        error = new Error('No matching record found');
        reject(error);
      }
    })
      .then(user => res.status(200).json(user))
      .catch(next);
  },

  delete: (req, res, next) => {
    const id = req.param('id');
    new Promise((resolve, reject) => {
      HotelUser.destroy(id, (error, result) => {
        if (result) {
          resolve(result.pop());
        } else {
          reject(error);
        }
      })
    })
      .then(user => res.status(200).json(user))
      .catch(next);
  }
	
};
