const connectDB = require('../config/db');
const { User, Thought } = require('../Models');

const seedData = async () => {
    try {
        // Clear existing users
        await User.deleteMany();
        console.log('Cleared existing users');

        const existingUsers = await User.find(); // Change to find users

        let user1, user2, user3, user4, user5, user6;

        if (existingUsers.length === 0) {
            const users = await Promise.all([
                User.create({
                    username: 'TomJones',
                    email: 'TomJones@TJ.com',
                    thoughts: [],
                    friends: []
                }),
                User.create({
                    username: 'SallySmith',
                    email: 'SSmith@example.com',
                    thoughts: [],
                    friends: []
                }),
                User.create({
                    username: 'BobSmith',
                    email: 'BobSm1th@Email.com',
                    thoughts: [],
                    friends: []
                }),
                User.create({
                    username: 'JillJones',
                    email: 'Mrs.Jones@jeeves.edu',
                    thoughts: [],
                    friends: []
                }),
                User.create({
                    username: 'CodeMonkey',
                    email: 'Bananas4Coding@email.com',
                    thoughts: [],
                    friends: []
                }),
                User.create({
                    username: 'CodeKangaroo',
                    email: 'HoppingMad@fun.com',
                    thoughts: [],
                    friends: []
                })
            ]);

            [user1, user2, user3, user4, user5, user6] = users;

            user1.friends.push(user2, user3, user4, user5, user6);
            user2.friends.push(user1, user3, user4, user5, user6);
            user3.friends.push(user1, user2, user4, user5, user6);
            user4.friends.push(user1, user2, user3, user5, user6);
            user5.friends.push(user1, user2, user3, user4, user6);
            user6.friends.push(user1, user2, user3, user4, user5);

            await Promise.all(users.map(user => user.save()));

            console.log('Users seeded');
        } else {
            console.log('Users already exist');

            // Find user1 in the existing users
            user1 = existingThoughts.find(thought => thought.username === 'TomJones');

            if (!user1) {
                console.log('User1 not found');
                process.exit(1);
            }
        }

        const thought1 = await Thought.create({
            thoughtText: 'I really like coding and I think more people should do it!',
            username: user1 && user1.username,
            createdAt: new Date(Date.now()),
        });

        const reaction1 = {
            reactionBody: 'I agree!',
            username: user2.username,
            createdAt: new Date(Date.now()),
        };

        const reaction2 = {
            reactionBody: 'Me too!',
            username: user3.username,
            createdAt: new Date(Date.now()),
        };

        thought1.reactions.push(reaction1, reaction2);
        user1.thoughts.push(thought1);

        await user1.save();
        console.log('Thoughts seeded');

        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

seedData();