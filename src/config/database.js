import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

// eslint-disable-next-line import/no-mutable-exports
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
  console.log('conectado ao banco de dados');
} catch (error) {
  console.log('Deu erro no server');
}

export default db;
