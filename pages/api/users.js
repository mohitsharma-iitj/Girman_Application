// pages/api/users.js
import dbConnect from '@/lib/mongoose'; // Adjust the path if necessary
import User from '@/models/User';

export default async function handler(req, res) {
    await dbConnect();

    const { query } = req;
    const { searchTerm } = query;

    try {
        // Fetch users from MongoDB
        const users = await User.find({
            $or: [
                { first_name: { $regex: searchTerm, $options: 'i' } },
                { last_name: { $regex: searchTerm, $options: 'i' } }
            ]
        }).exec();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
