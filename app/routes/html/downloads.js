import express from "express";
import Episode from "#models/episode";

const downloads = express.Router();

downloads.get("/:episodeId.json", async (req, res, next) => {
  try {
  const { episodeId } = req.params;
  let episode = await Episode.load(episodeId);
  
  res.setHeader("Content-Type", "application/json");
  res.send( JSON.stringify(episode, null, 2) );
} catch(err) {
  next(err);
}
});

downloads.get("/:episodeId.csv", async (req, res, next) => {
  try {
  const { episodeId } = req.params;
  let episode = await Episode.load(episodeId);

  const records = episode.records.map( record => `${record.timestamp}, ${record.type}, ${record.description}, ${record.value}`).join("\n");
  const response = "timestamp, type, description, value\n" + records;
  
  res.setHeader("Content-Type", "text/csv");
  res.send( response );
} catch(err) {
  next(err);
}
});



export default downloads;