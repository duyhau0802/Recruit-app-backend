import { createUser } from "../../models/usersModel.js";

export async function createUserController(req, res) {
  const { username, email, password } = req.body;
  const user = await createUser({ username, email, password });
  res.status(201).send(user);
}
