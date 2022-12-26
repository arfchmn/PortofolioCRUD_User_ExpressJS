import Express from "express";
import auth from "../auth/auth.js";
import{
    CreateUser,
    Login,
    UpdateUserProfile,
    DeleteUser,
    GetAllUser,
    GetUser,
    ResetPassword
}from "../Controller/UserController.js";

const router = Express.Router();

router.post("/register", CreateUser);
router.get("/login", Login);
router.get("/all", auth, GetAllUser);
router.get("/user/:Email", auth, GetUser);
router.put("/update", auth, UpdateUserProfile);
router.put("/resetPassword/:Email", auth, ResetPassword);
router.delete("/delete/:Email", auth, DeleteUser);

export default router;
