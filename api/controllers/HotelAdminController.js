module.exports = {

  create: (req, res) => {
    const params = req.params.all();
    new Promise((resolve, reject) => {
      User.create(params, (error, user) => {
        if (error) {
          reject(error)
        } else {
          resolve(user);
        }
      });
    })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(error.status).json(error));
  },

  index: (req, res) => {
    new Promise((resolve, reject) => {
      const query = User.find();
      const sortString = 'username ASC';
      const users = query.sort(sortString).populateAll();
      if(users) {
        resolve(users)
      } else {
        const error = new Error('Server error');
        reject(error)
      }
    })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(error.status).json(error));
  },

  find: (req, res, next) => {
    const id = req.param('id');
    User.findOne(id)
      .then(user => res.status(200).json(user))
      .catch(error => res.json(error));
  },


    // new Promise((resolve, reject) => {
    //   const user = User.findOne({ id }).populateAll();
    //   if(user) {
    //     console.log('success');
    //     resolve(user);
    //   } else {

    //     reject(error);
    //   }
    // })
    //   .then(user => res.status(200).json(user))
    //   .catch(error => res.status(error.status).json(error));

  update: (req, res, next) => {
    const id = req.param('id');
    const params = req.params.all();
    
    console.log(id, params);

    new Promise((resolve, reject) => {
      const user = User.update(id, params)
      console.log(user);
      if (user) {
        resolve(user);
      } else {
        reject(error);
      }
    })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(error.status).json(error));
  },

  // delete: (req, res) => {
  //   (async () => { 
  //     const id = req.param('id');
  //     const records = await User.destroy({ id }).fetch();
  //     console.log(records);
  //     return res.ok();
  //   })()
  // }
	
};
