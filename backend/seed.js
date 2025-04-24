import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Goal from './models/Goal.js';
import sampleGoals from './sample-data/sampleGoals.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected...');

    await Goal.deleteMany({});
    await Goal.insertMany(sampleGoals);

    console.log('✅ Sample goals inserted successfully!');
    process.exit(); // Exit after done
  })
  .catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
