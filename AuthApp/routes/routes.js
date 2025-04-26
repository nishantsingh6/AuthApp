const express =  require('express');
const router = express.Router(); 

const{signUp,login} = require('../controllers/authAppControllers');
const {isAuth, isStudent, isAdmin, isTeacher} = require("../middlewares/auth");

router.post("/signup", signUp);
router.post("/login", login);

//Protected route
router.get("/student", isAuth, isStudent, (req, res) => {
    const { title, surname, email, role } = req.user;
    return res.status(200).json({
        success: true,
        message: `Welcome back, ${title}`,
        title,
        surname,
        email,
        role,
    });
});


router.get("/admin", isAuth, isAdmin, (req, res) => {
    const { title, surname, email, role } = req.user;

    return res.status(200).json({
        success: true,
        message: `Welcome back, ${title}`,
        title,
        surname,
        email,
        role,
    });
});

router.get("/teacher", isAuth, isTeacher, (req,res) => {
    const { title, surname, email, role } = req.user;
    return res.status(200).json({
        success: true,
        message: `Welcome back, ${title}`,
        title,
        surname,
        email,
        role,
    })
})

module.exports = router;