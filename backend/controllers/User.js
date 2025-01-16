const User = require('../models/User');
const {v4 : uuidv4} = require('uuid');


exports.add = async (req,res) => {
        try {
            const {username, age, hobbies} = req.body;

            if(!username || !age || !hobbies || !Array.isArray(hobbies))
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
            
            const allusers = await User.find({});
            return res.status(200).json({
                success: true,
                message : 'adding done....',
                details : userDetails,
                users : allusers,
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

            if(!id || !username || !age || !hobbies || !Array.isArray(hobbies))
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
                
                console.log(existUser);    
                await existUser.save();
                const allusers = await User.find({});
                return res.status(200).json({
                    success: true,
                    message : 'editing done....',
                    details : existUser,
                    users : allusers
                });

        }catch(error)
        {
            return res.status(500).json({
                success: false,
                message : 'error at editing side',
                mm : `${error}`
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
        const allusers = await User.find({});
        return res.status(200).json({
            success: true,
            message : 'deleted',
            users : allusers,
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

exports.add_hobby = async (req,res) => {
    try {
        const {id} = req.params;
        const {hobby} = req.body;

        if(!id || !hobby)
        {
            return res.status(404).json({
                success: false,
                message : 'give all details'
            });   
        }

        const existUser = await User.findOne({id : id});

        if(!existUser)
        {
            return res.status(409).json({
                success: false,
                message : 'user not added',
            })   
        }

        if(existUser.hobbies.includes(hobby))
        {
            return res.status(401).json({
                success: false,
                message : 'already added',
            });
        }

        existUser.hobbies.push(hobby);
        await existUser.save();
        const allusers = await User.find({});

        return res.status(200).json({
            success: true,
            message : 'hobby added',
            details : existUser,
            users : allusers,
        })

    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'error at fetching side'
        })
    }
}
exports.delete_hobby = async (req,res) => {
    try {
        const {id} = req.params;
        const {hobby} = req.body;

        if(!id || !hobby)
        {
            return res.status(404).json({
                success: false,
                message : 'give all details'
            });   
        }

        const existUser = await User.findOne({id : id});

        if(!existUser)
        {
            return res.status(409).json({
                success: false,
                message : 'user not added',
            })   
        }

        if(!existUser.hobbies.includes(hobby))
        {
            return res.status(401).json({
                success: false,
                message : 'not added',
            });
        }

        existUser.hobbies = existUser.hobbies.filter((hob) => hob !== hobby);

        await existUser.save();
        const allusers = await User.find({});
        return res.status(200).json({
            success: true,
            message : 'hobby deleted',
            details : existUser,
            users : allusers,
        })

    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'error at fetching side'
        })
    }
}


