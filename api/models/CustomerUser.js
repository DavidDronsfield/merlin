const bcrypt = require('bcryptjs');
const { toLowercase } = require('../../helpers/formatter');

module.exports = {
  schema: true,
  attributes: {
    method: {
      type: 'string',
      isIn: [ 'local', 'google', 'facebook' ],
      required: true
    },
    local: {},
    google: {
      type: 'json',
    },
    facebook: {
      type: 'json',
    },
    email: {
      type: 'string',
      lowercase: true
    },
    password: {
      type: 'string'
    },
    toJSON: function() {
      return _.omit(this, ['password']);
    }
  },

  beforeCreate: async function(recordToCreate, proceed) {
    try {
      // Only applies to local users
      if(recordToCreate.method !== 'local') return proceed();
      // Lowercase email
      recordToCreate.email = toLowercase(recordToCreate.email);
      // Generate salt
      const salt = await bcrypt.genSalt(10);
      // Hash password (salt + hash)
      recordToCreate.password = await bcrypt.hash(recordToCreate.password, salt);

      return proceed();
    } catch(error) {
      return proceed(error);
    }
  }
};
