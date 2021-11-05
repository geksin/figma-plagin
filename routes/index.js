const router = require('express').Router();
const { getMe,getTask, postComment } = require('../controllers/issue')

router.get('/me', getMe);

router.get('/task', getTask);

router.post('/comment', postComment);

router.use('*', (req, res, next) => {
    next(new NotFoundError('Некорректный адрес'));
  });


module.exports = router;