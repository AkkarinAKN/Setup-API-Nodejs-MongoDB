import modelService from "../models/modelService.js";
import modelCar from "../models/modelCar.js";
import modelRoute from "../models/modelRoute.js";

// export const createService = async (req, res, next) => {
//   try {
//     const carID = await modelCar.findOne(req.body.id);
//     const routeID = await modelRoute.findOne(req.body.id);
//     const newService = new modelService({
//       route: routeID,
//       car: carID,
//       price: req.body.price,
//     });
//     await newService.save();
//     res.status(200).send("SUCCESS");
//   } catch (err) {
//     next(err);
//   }
// };

export const createService = async (req, res, next) => {
  const newService = modelService(req.body);
  try {
      const saveService = await newService.save();
      res.status(200).json(saveService)
  } catch (err) {
    next(err);
  }
};



export const getService = async (req,res,next)=>{
  try {
    const setService = await modelService.find();
    res.status(200).json(setService);
  } catch (err) {
    next(err);
  }
  }
