import _ from "lodash";
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

    // Kiểm tra nếu không có từ khóa tìm kiếm được cung cấp
    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    // Tìm kiếm phim theo từ khóa
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        // { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: "Search movies successfully",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const compareDates = (a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);

  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  } else {
    return 0;
  }
};

export const getSortedByCreatedAt = async (req, res) => {
  try {
    const sortOrder = req.query.sortOrder || "desc"; // Mặc định là sắp xếp mới nhất

    const movies = await Movie.find().sort({ createdAt: sortOrder });

    res.status(200).json({
      message: `Get movies sorted by created time (${sortOrder}) successfully`,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
