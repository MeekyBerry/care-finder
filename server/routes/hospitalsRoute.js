import express from "express";
import {
  getHospitals,
  getHospitalByName,
  findHospitals,
  searchHospitals,
  addHospital,
  updateHospital,
  deleteHospital
} from "../controllers/hospitalController.js";
import verify from "../middleware/verify.js";
// import checkJwt from "../middleware/auth0.js";

const hospitalRouter = express.Router();

hospitalRouter.route("/")
  .get(getHospitals)
  .post(addHospital)
  .patch(verify, updateHospital)

hospitalRouter.route("/find")
  .get(findHospitals)

hospitalRouter.route("/search")
  .get(searchHospitals)

hospitalRouter.route("/:name")
  .get(getHospitalByName)

hospitalRouter.route("/")
  .delete(deleteHospital);

export default hospitalRouter;