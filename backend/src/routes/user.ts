import { User } from './../models/users';
import express from 'express'
import { environment } from '../common/environments';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const userRouter = express.Router();
//get all users
userRouter.get('', async (req, res) => {
    try {
        const user = await User.find();
        var data = new Date(Date.now())
        console.log(`Entrou ${data}`)
        return res.send(user)
    } catch (err) {
        return res.status(500).send({ error: `Get failed : ${err}` })
    }
});
//get one user
userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }, req.body).then(user => {
            if (user) {
                return res.json(user)
            }
            return res.status(404).send({ error: `User not exists` })
        });
    } catch (err) {
        return res.status(500).send({ error: `Get failed : ${err}` })
    }
});
//register user
userRouter.post('', async (req, res) => {
    try {
        const user: any = await User.create(req.body);
        user.password = undefined;
        return res.send(user)
    } catch (err) {
        return res.status(400).send({ error: `Registration failed : ${err}` })
    }
});
//edit user
userRouter.patch('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(user => {
            if (user) {
                return res.json(user)
            }
            return res.status(404).send({ error: `User not exists` })
        });
    } catch (err) {
        return res.status(400).send({ error: `Update failed : ${err}` })
    }
});
//delete user
userRouter.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id }, req.body).then(user => {
            if (user) {
                return res.json({ message: 'User deleted sucessfully.' })
            }
            return res.status(404).send({ error: `User not exists.` })
        });
    } catch (err) {
        return res.status(400).send({ error: `Delete failed : ${err}` })
    }
});

//COSTS
//get all user costs
userRouter.get('/:id/costs/', async (req, res) => {
    try {
        const userCosts = await User.findOne({ '_id': req.params.id }, 'costs').then(userCosts => {
            if (userCosts) {
                return res.send(userCosts);
            } else {
                return res.status(404).send({ error: `No costs registered` });
            }
        });
    } catch (err) {
        return res.status(500).send({ error: `Get failed : ${err}` })
    }
});
//get one especific user cost
userRouter.get('/:id/costs/:cid', async (req, res) => {
    try {
        const cost = await User.findOne({ '_id': req.params.id, 'costs._id': req.params.cid }, 'costs.$').then(cost => {
            if (cost) {
                return res.json(cost)
            }
            return res.status(404).send({ error: `Cost not exists` })
        });
    } catch (err) {
        return res.status(500).send({ error: `Get failed : ${err}` })
    }
});
//register user cost
userRouter.post('/:id/costs', async (req, res) => {
    try {
        const cost = await User.findOneAndUpdate({ '_id': req.params.id }, {
            $push: {
                'costs': req.body
            },
        }, { new: true }).then(cost => {
            if (cost) {
                return res.status(201).send(cost)
            } else {
                return res.status(404).send({ error: `Cost register failed` });
            }
        });

    } catch (err) {
        return res.status(400).send({ error: `Post failed : ${err}` })
    }
});
//update user cost
userRouter.patch('/:id/costs/:cid', async (req, res) => {
    try {
        const cost = await User.findOneAndUpdate({ '_id': req.params.id, 'costs._id': req.params.cid },
            { 'costs.$': req.body },
            { new: true }).then(cost => {
                if (cost) {
                    return res.status(201).send(cost)
                } else {
                    return res.status(404).send({ error: `Cost not exists.` });
                }
            });
    } catch (error) {
        return res.status(404).send({ err: `Cost update failed: ${error}` });
    }

});
//autenticação
userRouter.post('/authenticate', async (req, res) => {
    const user: any = await User.findOne({ email: req.body.email }).select('+password -costs -earnings');
    console.log(user)
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    } else {
        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({ error: 'Invalid password' })
        } else {
            user.password = undefined

            const token = jwt.sign({ id: user._id }, environment.security.secretToken, {
                expiresIn: '30 days'
            })
            res.status(200).send({ user, token })
        }
    }
})

//OBJECTS
//get all objects from user
userRouter.get('/:id/objects/', async (req, res) => {
    try {
        const objects = await User.findOne({ '_id': req.params.id }, 'objects').then(objects => {
            if (objects) {
                return res.send(objects);
            } else {
                return res.status(404).send({ error: `No objects registered` });
            }
        });
    } catch (err) {
        return res.status(500).send({ error: `Get failed : ${err}` })
    }
});
//get one object from user
userRouter.get('/:id/objects/:oid', async (req, res) => {
    try {
        const object = await User.findOne({ '_id': req.params.id, 'object._id': req.params.oid }, 'object.$').then(object => {
            if (object) {
                return res.json(object)
            }
            return res.status(404).send({ error: `Object not exists` })
        });
    } catch (err) {
        return res.status(500).send({ error: `Get failed : ${err}` })
    }
});
//post user object
userRouter.post('/:id/objects', async (req, res) => {
    try {
        const object = await User.findOneAndUpdate({ '_id': req.params.id }, {
            $push: {
                'objects': req.body
            },
        }, { new: true }).then(object => {
            if (object) {
                return res.status(201).send(object)
            } else {
                return res.status(404).send({ error: `Object register failed` });
            }
        });
    } catch (err) {
        return res.status(400).send({ error: `Post failed : ${err}` })
    }
});
userRouter.get('/', (req, res) => {
    res.send('Works')
})