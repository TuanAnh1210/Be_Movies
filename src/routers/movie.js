import express from "express";
import { get } from "../controllers/movie";

const movieRouter = express.Router();

movieRouter.get("/movies", get);
// productRouter.get('/products/:id', getById)
// productRouter.post('/products', create)
// productRouter.put('/products/:id', update)
// productRouter.delete('/products/:id', remove)

export default movieRouter;
