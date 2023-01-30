import dayjs from 'dayjs';
import db from '../config/database.js';

export default async function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);

  const session = await db.collection('sessions').findOne({ token });

  if (!session || dayjs().isAfter(session.expires_at)) return res.sendStatus(401);

  const user = await db.collection('users').findOne({ _id: session.user_id });

  res.locals.auth = user;
  return next();
}
