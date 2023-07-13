import Movie from "../models/movie";

export const get = async (req, res) => {
  try {
    const data = await Movie.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
