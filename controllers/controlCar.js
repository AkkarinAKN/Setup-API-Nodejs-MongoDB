import modelCar from "../models/modelCar.js";

export const createCar = async (req, res, next) => {
  const newCar = modelCar(req.body);
  try {
    const saveCar = await newCar.save();
    res.status(200).json(saveCar);
  } catch (err) {
    next(err);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const updateCar = await modelCar.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateCar);
  } catch (err) {
    next(err);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    await modelCar.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getCar = async (req, res, next) => {
  try {
    const Cars = await modelCar.find();
    res.status(200).json(Cars);
  } catch (err) {
    next(err);
  }
};
