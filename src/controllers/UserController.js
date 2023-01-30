import { MongoClient } from 'mongodb';
import db from '../config/database.js';
import UserAddress from '../models/UserAddress.js';
import validateUpdateMyAccountSchema from '../validations/updateMyAccountSchema.js';

export async function getMyAddress(req, res) {
  try {
    const user = res.locals.auth;

    const address = await db.collection('userAddress').findOne({ user_id: user._id });

    delete address._id;
    delete address.user_id;

    return res.send(address);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function updateMyAccount(req, res) {
  const {
    name, email, address, error,
  } = await validateUpdateMyAccountSchema(req.body);

  if (error) return res.status(422).send(error);

  const mongoClient = new MongoClient(process.env.DATABASE_URL);
  const session = mongoClient.startSession();

  try {
    const user = res.locals.auth;

    await session.startTransaction();

    await db.collection('user').updateOne(
      { _id: user._id },
      { $set: { name, email } },
    );

    const userAddress = new UserAddress(
      user._id,
      address.cep,
      address.address,
      address.number,
      address.complement,
      address.area,
      address.city,
      address.state,
    );

    await db.collection('userAddress').updateOne(
      { user_id: user._id },
      { $set: userAddress },
      { upsert: true },
    );

    await session.commitTransaction();
    return res.sendStatus(204);
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
    return res.status(500).send(err);
  } finally {
    await session.endSession();
  }
}
