import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

        let admin = await User.findOne({ email: adminEmail });

        if (admin) {
            console.log("Admin already exist", admin.email);
            process.exit(0);
        }

        const hashed = await bcrypt.hash(adminPassword, 12);

        admin = await User.create({
            name: 'Admin',
            email: adminEmail,
            passwordHash: hashed,
            role: 'admin'
        });

        console.log('Admin user created:');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();