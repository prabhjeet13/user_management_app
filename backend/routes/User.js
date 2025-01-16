const express = require('express');
const router = express.Router();
const {add, deleteUser,edit,getAllusers,add_hobby,delete_hobby} = require('../controllers/User');


router.post('/adduser',add);

router.post('/edituser/:id',edit);

router.delete('/deleteuser/:id',deleteUser);

router.get('/getallusers',getAllusers);

router.post('/add_hobby/:id',add_hobby);
router.post('/delete_hobby/:id',delete_hobby);

module.exports = router;