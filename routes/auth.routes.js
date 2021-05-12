const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken')
const {validationResult,check} = require('express-validator');
const User = require('../models/User');

const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email','incorrect email').isEmail(),
        check('password','min length is 6 symbols').isLength({min:6})
    ],
    async (req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array(),message:"incorrect input when register"})
        }
        const {email,password} = req.body;

        const candidate = await User.findOne({email});
        if(candidate){
            return res.status(400).json({message:"The user already exists"});
        }
        const hashedPasswords = await bcrypt.hash(password,12);
        const user = new User({email,password: hashedPasswords});

        await user.save();

        res.status(201).json({message:"The user has been added"});

    }catch (e) {
        res.status(500).json({message:`Error: ${e}`})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email','enter correct email').normalizeEmail().isEmail(),
        check('password','enter password').exists(),
    ],
    async (req,res) => {
        try{
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({error:errors.array(),message:"incorrect when auth"})
            }
        const {email, password} = req.body;
           const user = await User.findOne({email});
           if(!user){
               return res.status(400).json({message:"smt went wrong"});
           }

           const isMatch = await bcrypt.compare(password, user.password);

           if (!isMatch){
               return res.status(400).json({message:"enter valid values or get out"});
           }

           const token = jwt.sign(
               {userId: user.id},
               config.get('jwtSecret'),
               {expiresIn:'1h'}
               )
            res.status(200).json({token, userId:user.id})

        }catch (e) {
            res.status(500).json({message:`Error: ${e}`})
        }
    })
module.exports = router;

