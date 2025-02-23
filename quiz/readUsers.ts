import express, { Response } from 'express';
import { User, UserRequest } from './types';

const router = express.Router();

// a route that sends the usernames of the users to the client
router.get('/usernames', (req: UserRequest, res: Response) => {
  let usernames = req.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

// a function that returns a username's email
router.get('/username/:name', (req: UserRequest, res: Response) => {
  // Get the inputted username
  const inputUsername = req.params.name;

  // Find the users
  const users = req.users?.find(user => user.username === inputUsername);

  // Respond with either the user's email or an error
  if (users) {
    res.json([{ id: users.id, email: users.email }]);
  }
  else {
    res.status(404).send('No user found with that name');
  }
});

export default router;