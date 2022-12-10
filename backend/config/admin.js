module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a33f7f8a6ad3c09e95bdde6e3e11920a'),
  },
});
