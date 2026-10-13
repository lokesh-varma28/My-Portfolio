/* global process */
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
try {
    await client.connect();
    await client.db('portfolio').command({ ping: 1 });
    console.log('MongoDB connected');
} catch (e) {
    console.error('Failed:', e.message);
} finally {
    await client.close();
}