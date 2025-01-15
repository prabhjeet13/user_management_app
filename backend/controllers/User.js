const User = require('../models/User');
const {v4 : uuidv4} = require('uuid');


exports.add = async (req,res) => {
        try {
            const {username, age, hobbies} = req.body;

            if(!username || !age || !hobbies)
            {
                return res.status(404).json({
                    success: false,
                    message : 'give all details'
                });
            }

            const existUser = await User.findOne({username : username});

            if(existUser) 
            {
                return res.status(409).json({
                    success: false,
                    message : 'already added',
                });
            }

            const userDetails = await User.create({
                id : uuidv4(),
                username,
                age,
                hobbies,
            });

            return res.status(200).json({
                success: true,
                message : 'adding done....',
                details : userDetails,
            })
        }catch(error)
        {
            return res.status(500).json({
                success: false,
                message : 'error at adding side'
        
            })
        }
}

exports.edit = async (req,res) => {
        try {
            const {id} = req.params;
            const {username, age, hobbies} = req.body;

            if(!id || !username || !age || !hobbies)
            {
                return res.status(404).json({
                    success: false,
                    message : 'give all details'
                });
            }

            const existUser = await User.findOne({id : id});

            if(!existUser) 
            {
                return res.status(404).json({
                    success: false,
                    message : 'user not found',
                });
            }


                const check_new_Username = await User.findOne({username : username});
                if(check_new_Username && check_new_Username.id !== id) 
                {
                        return res.status(401).json({
                            success: false,
                            message : 'already added',
                        });
                } 
                existUser.username = username;
                existUser.age = age;
                existUser.hobbies = hobbies;    
                await existUser.save();

                return res.status(200).json({
                    success: true,
                    message : 'editing done....',
                    details : existUser,
                });

        }catch(error)
        {
            return res.status(500).json({
                success: false,
                message : 'error at adding side'
        
            })
        }
}

exports.deleteUser = async(req,res) => {
    try {

        const {id} = req.params;

        const existUser = await User.findOne({id:id});

        if(!existUser) 
        {
            return res.status(404).json({
                success: false,
                message : 'user not found'
            })
        }

        await existUser.deleteOne({id : id});

        return res.status(200).json({
            success: true,
            message : 'deleted'
        })

    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'server down....',
        })
    }
}

exports.getAllusers = async(req,res) => {
    try {
         const users = await User.find({});     
         return res.status(200).json({
             success : true,
             message : 'fetch successfull',
             users,
         });
       }catch(error)
       {
         return res.status(500).json({
             success: false,
             message : 'error at fetching side'
         })
       }
}


