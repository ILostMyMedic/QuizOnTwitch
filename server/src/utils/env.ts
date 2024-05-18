import dotenv from 'dotenv';
dotenv.config();

export default {
    isProduction: process.env.NODE_ENV === 'production',
};
