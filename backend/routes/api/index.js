
// GET /api/restore-user

//express imports
const router = require('express').Router();
//sequelize imports
const { User } = require('../../db/models');

//middleware imports
const { restoreUser, setTokenCookie, requireAuth} = require('../../utils/auth.js');


//Middleware
router.use(restoreUser);



module.exports = router;