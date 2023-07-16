import express from "express";
import {
  create,
  get,
  getById,
  remove,
  search,
  update,
} from "../controllers/cast";

const castRouter = express.Router();

castRouter.get("/casts", get);
castRouter.get("/casts/:id", getById);
castRouter.get("/search", search);
castRouter.post("/casts", create);
castRouter.patch("/casts/:id", update);
castRouter.delete("/casts/:id", remove);

export default castRouter;
