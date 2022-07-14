import modelAdmin from "../models/modelAdmin.js";
import bcrypt from "bcryptjs";
import { createError } from "./../utils/error.js";
import jwt from "jsonwebtoken";

export const createAdmin = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newAdmin = new modelAdmin({
      ...req.body,
      password: hash,
    });
    await newAdmin.save();
    res.status(200).send("SUCCESS");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const admin = await modelAdmin.findOne({ email: req.body.email });
    if (!admin) return next(createError(404, "USER NOT FOUND!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong Password of Username !!"));

    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = admin._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const updateAdmin = await modelAdmin.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateAdmin);
  } catch (err) {
    next(err);
  }
};

export const deleteAdmin = async (req,res,next)=>{
    try {
      await modelAdmin.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  }

  export const getAdmin = async (req,res,next)=>{
    try {
      const admin = await modelAdmin.findById(req.params.id);
      res.status(200).json(admin);
    } catch (err) {
      next(err);
    }
  }
  export const getAdmins = async (req,res,next)=>{
    try {
      const admin = await modelAdmin.find();
      res.status(200).json(admin);
    } catch (err) {
      next(err);
    }
  }