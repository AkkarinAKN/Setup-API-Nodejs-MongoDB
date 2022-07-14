import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema({
  routeFrom: {
    type: String,
    required: true,
  },
  routeTo: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  seat: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo:{
    type:String,
  }
});

export default mongoose.model("Service", ServiceSchema);
