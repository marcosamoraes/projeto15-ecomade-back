import { ObjectId } from 'mongodb';
import db from '../config/database.js';

export const getProducts = async (req, res) => {
  try {
    const products = await db.collection('moveis').find().toArray();
    return res.send(products);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.collection('moveis').findOne({ _id: ObjectId(id) });
    return res.send(product);
  } catch (error) {
    return res.sendStatus(500);
  }
};
