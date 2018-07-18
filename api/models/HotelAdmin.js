module.exports = {
  schema: true,
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  }
};
