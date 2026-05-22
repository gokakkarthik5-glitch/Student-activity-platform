import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Activity } from './models/Activity';
import { Club } from './models/Club';
import { Achievement } from './models/Achievement';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'student_activity',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Activity, Club, Achievement],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: ['src/database/subscribers/*.ts'],
});

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}
