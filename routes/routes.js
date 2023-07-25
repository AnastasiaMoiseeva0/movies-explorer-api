const router = require('express').Router();
const auth = require('../middlewares/auth');
const errorsMiddlewares = require('../middlewares/errorsMiddlewares');
const NotFoundError = require('../errors/NotFoundError');
const {
  login,
  createUser,
} = require('../controllers/users');

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.post('/signin', login);

router.post('/signup', createUser);

router.use('*', auth, (req, res, next) => { next(new NotFoundError('Неккоректный путь')); });

router.use(errorsMiddlewares);

module.exports = router;
