const bcrypt = require('bcryptjs');
const { toLowercase } = require('../../helpers/formatter');

module.exports = {
  schema: true,
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    toJSON: function() {
      return _.omit(this, ['password']);
    }
  },

  beforeCreate: async function(recordToCreate, proceed) {
    try {
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
