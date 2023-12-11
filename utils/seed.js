const connectDB = require('../config/db');
const { User, Thought } = require('../Models');
const mongoose = require('mongoose');

const seedData = async () => {
    try {
        const existingUsers = await User.find();
        const existingThoughts = await Thought.find();

        let user1, user2, user3, user4, user5, user6;

        if (existingUsers.length === 0) {
            user1 = await User.create({
                username: 'TomJones',
                email: 'TomJones@TJ.com',
                thoughts: [],
                friends: []
            });

            user2 = await User.create({
                username: 'SallySmith',
                email: 'SSmith@example.com',
                thoughts: [],
                friends: []
            });

            user3 = await User.create({
                username: 'BobSmith',
                email: 'BobSm1th@Email.com',
                thoughts: [],
                friends: []
            });

            user4 = await User.create({
                username: 'JillJones',
                email: 'Mrs.Jones@jeeves.edu',
                thoughts: [],
                friends: []
            });

            user5 = await User.create({
                username: 'CodeMonkey',
                email: 'Bananas4Coding@email.com',
                thoughts: [],
                friends: []
            });

            user6 = await User.create({
                username: 'CodeKangaroo',
                email: 'HoppingMad@fun.com',
                thoughts: [],
                friends: []
            });

            user1.friends.push(user2, user3, user4, user5, user6);
            user2.friends.push(user1, user3, user4, user5, user6);
            user3.friends.push(user1, user2, user4, user5, user6);
            user4.friends.push(user1, user2, user3, user5, user6);
            user5.friends.push(user1, user2, user3, user4, user6);
            user6.friends.push(user1, user2, user3, user4, user5);

            await user1.save();
            await user2.save();
            await user3.save();
            await user4.save();
            await user5.save();
            await user6.save();

            console.log('Users seeded');
        } else {
            console.log('Users already exist');
        }

        if (existingThoughts.length === 0) {
            const thought1 = await Thought.create({
                thoughtText: 'I really like coding and I think more people should do it!',
                username: user1.username,
                createdAt: new Date(Date.now()),
                reactions: [
                    {
                        reactionBody: 'I agree!',
                        username: user2.username,
                        createdAt: new Date(Date.now())
                    },
                    {
                        reactionBody: 'Me too!',
                        username: user3.username,
                        createdAt: new Date(Date.now())
                    }
                ]
            });

            user1.thoughts.push(thought1);
            await user1.save();
            console.log('Thoughts seeded');
        }else{
            console.log('Thoughts already exist');
        }
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

seedData();