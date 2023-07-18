import express from "express";
import {
  create,
  get,
  getById,
  getSortedByCreatedAt,
  remove,
  search,
  update,
} from "../controllers/movie";

const movieRouter = express.Router();

movieRouter.get("/movies", get);
movieRouter.get("/movies/:id", getById);
movieRouter.get("/search", search);
movieRouter.get("/sort-movie/sorted-by-createdAt", getSortedByCreatedAt);
// /sort-movie/sorted-by-createdAt?sortOrder=desc
// /sort-movie/sorted-by-createdAt?sortOrder=asc
movieRouter.post("/movies", create);
movieRouter.patch("/movies/:id", update);
movieRouter.delete("/movies/:id", remove);

export default movieRouter;
