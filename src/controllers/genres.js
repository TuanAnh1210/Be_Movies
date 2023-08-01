import mongoose from "mongoose";
import Genres from "../models/genres";
import { castSchema, updateCastSchema } from "../schemas/castSchema";
import { genresSchema, updateGenresSchema } from "../schemas/genresSchema";

export const get = async (req, res) => {
  try {
    const data = await Genres.find();
    res.send({
      message: "Get genres successfully",
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid genres ID",
      });
    }

    const genres = await Genres.findById(id);
    if (!genres) {
      return res.status(404).json({
        message: "The genres does not exist",
      });
    }
    return res.status(200).send({
      message: "Get genres successfully",
      data: genres,
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }
    const genres = await Genres.findByIdAndRemove(id);
    if (!genres) {
      return res.status(404).send({
        message: "The genres does not exist",
      });
    }
    return res.status(204).send({
      message: "Delete successfully",
      data: genres,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.isValid(id)) {
      return res.status(400).json({
        message: "Invalid genres ID",
      });
    }
    const body = req.body;
    const { error } = updateGenresSchema.validate(body);
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    const data = await Genres.findByIdAndUpdate(id, body, { new: true });
    if (!data) {
      return res.status(400).send({
        message: "Genres is not existed",
      });
    }
    return res.send({
      message: "Update successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: err,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;

    const { error } = genresSchema.validate(body);
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    const data = await Genres.create(body);
    return res.send({
      message: "Create cast successfully",
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: "Loi server",
    });
  }
};

export const search = async (req, res) => {
  try {
    const query = req.query.q;
    const genres = await Genres.find({ $text: { $search: query } });
    res.send({
      message: "Search genres successfully",
      data: genres,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
