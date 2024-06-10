import { createUser } from "../../models/usersModel.js";

export async function getUsers(req, res) {
  const { username, email, password } = req.body;
  const user = await createUser({ username, email, password });
  res.status(201).send(user);
}
// copy from old file, can delete any time
