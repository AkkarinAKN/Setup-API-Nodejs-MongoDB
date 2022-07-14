import express from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdmins, login, updateAdmin } from './../controllers/controlAdmin.js';
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/createadmin", verifyAdmin,createAdmin);
router.post("/login", login)

router.put("/:id", verifyAdmin, updateAdmin);

//DELETE
router.delete("/:id", verifyAdmin, deleteAdmin);

//GET
router.get("/:id", verifyAdmin, getAdmin);

//GET ALL
router.get("/", verifyAdmin, getAdmins);

export default router;