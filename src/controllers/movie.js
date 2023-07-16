import Movie from "../models/movie";
import { movieSchema, updateMovieSchema } from "../schemas/movieSchema";

export const get = async (req, res) => {
  try {
    const data = await Movie.find();
    res.send({
      message: "Get movies successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        message: "The movie does not exist",
      });
    }
    return res.status(200).send({
      message: "Get movie successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndRemove(id);
    if (movie) {
      res.status(204).send({
        message: "Delete successfully",
        data: movie,
      });
    } else {
      res.status(404).send({
        message: "The movie does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = movieSchema.validate(body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
    } else {
      const data = await Movie.create(body);
      res.send({
        message: "Create movie successfully",
        data,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Loi server",
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = updateMovieSchema.validate(body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
    } else {
      const data = await Movie.findByIdAndUpdate(id, body, { new: true });
      if (data) {
        res.send({
          message: "Update successfully",
          data,
        });
      } else {
        res.status(400).send({
          message: "Movie is not existed",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const search = async (req, res) => {
  try {
    const query = req.query.q;
    console.log(query, "query day ne");
    const movies = await Movie.find({ $text: { $search: query } });
    res.send({
      message: "Search movies successfully",
      data: movies,
    });
  } catch (error) {
    console.log(error, "error day ne");

    res.status(500).send({
      message: error,
    });
  }
};
