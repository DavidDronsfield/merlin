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
    }
  }
};
