import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import { createCar, deleteCar, getCar, updateCar } from './../controllers/controlCar.js';
const router = express.Router();

router.post("/",verifyAdmin, createCar);

router.put("/:id",verifyAdmin, updateCar);

router.delete("/:id",verifyAdmin,deleteCar);

router.get("/", verifyAdmin,getCar)


export default router;