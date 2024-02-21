const {postWork,
       getWork,
       deleteWork,
       patchWork} = require('../Controller/controller');
       const reqAuth = require('../AuthWare/authenticator')
const router = require('express').Router();

//require for all workout routes

router.use(reqAuth);

//get request
router.get('/', getWork);

//post request
router.post('/', postWork)

//delete request
router.delete('/:id', deleteWork)


//patch request
router.patch('/:id',patchWork)


module.exports = router