import _ from "lodash";
import Movie from "../models/movie";
import { movieSchema, updateMovieSchema } from "../schemas/movieSchema";
import mongoose from "mongoose";

export const get = async (req, res) => {
  try {
    const data = await Movie.find().populate([
      {
        path: "casts",
        select: ["name", "birthday"],
      },
      {
        path: "genres",
        select: "name",
      },
    ]);

    // const movies = await Movie.find().populate("casts", "name");
    // const data = await Movie.findOne({ title: "Phim Doraemon" }, { cast: 1 });
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

// export const getById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const movie = await Movie.findById(id).populate([
//       {
//         path: "casts",
//         select: ["name", "birthday"],
//       },
//       {
//         path: "genres",
//         select: "name",
//       },
//     ]);

//     console.log(movie, "movie ne");

//     if (!movie) {
//       return res.status(404).json({
//         message: "The movie does not exist",
//       });
//     }
//     return res.status(200).send({
//       message: "Get movie successfully",
//       data: movie,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error,
//     });
//   }
// };

export const getById = async (req, res) => {
  try {
    const id = req.params.id;

    // Kiểm tra nếu id không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(id).populate([
      {
        path: "casts",
        select: ["name", "birthday"],
      },
      {
        path: "genres",
        select: "name",
      },
    ]);

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
      message: error.toString(),
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    // Kiểm tra nếu id không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findByIdAndRemove(id);

    if (!movie) {
      return res.status(404).send({
        message: "The movie does not exist",
      });
    }
    return res.status(204).send({
      message: "Delete successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).send({
      message: error.toString(),
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = movieSchema.validate(body);

    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    const data = await Movie.create(body);
    return res.send({
      message: "Create movie successfully",
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.toString(),
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    // Kiểm tra nếu id không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }
    const body = req.body;

    const { error } = updateMovieSchema.validate(body);

    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    const data = await Movie.findByIdAndUpdate(id, body, { new: true });
    if (!data) {
      return res.status(400).send({
        message: "Movie is not existed",
      });
    }
    return res.send({
      message: "Update successfully",
      data,
    });
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
        // { extract: { $regex: query, $options: "i" } },
      ],
    }).populate([
      {
        path: "casts",
        select: ["name", "birthday"],
      },
      {
        path: "genres",
        select: "name",
      },
    ]);

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

export const getSortedByCreatedAt = async (req, res) => {
  try {
    const year = req.query.year;

    const movies = await Movie.find({
      year: { $gte: new Date(+year) },
    }).populate([
      {
        path: "casts",
        select: ["name", "birthday"],
      },
      {
        path: "genres",
        select: "name",
      },
    ]);

    res.status(200).json({
      message: `Lấy các phim được tạo từ năm ${year} thành công`,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
