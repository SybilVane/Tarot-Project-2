module.exports = app => {
  app.use('/', require('./base.routes'));
  app.use('/', require('./auth.routes'));
  app.use('/user', require('./user.routes'));
  app.use('/cards', require('./cards.routes'));
};
