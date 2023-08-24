import Express from "express";
import users from "./queries.mjs";
const Routes = Express.Router();

Routes.get("/users", users.getUsers);
Routes.get("/users/:id", users.getUser);
Routes.post("/users", users.createUser);
Routes.put("/users/:id", users.updateUser);
Routes.delete("/users/:id", users.deleteUser);
export default Routes;
