const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

//for register a new user
router.post('/register', async (req, res) => {

    try {

        //check if user already exist
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }
        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //save the user
        const user = new User(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User registred successfully",
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }

});



//for login user
router.post('/login', async (req, res) => {

    try {

        //check if user already exist
        const user = await User.findOne({ email: req.body.email });


        if (!user) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }

        //compare the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }

        //generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.jwt_secret, { expiresIn: '1d' }


        )

        return res.send({
            success: true,
            message: "User logged in successfully",
            data: token
        });


    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }

});


//get current user
router.get("/get-current-user", authMiddleware , async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        return res.send({
            success: true,
            message: "User was fetched successfully",
            data: user,
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});



module.exports = router;

