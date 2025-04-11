import express from "express";
import Episode from "#models/episode";

const downloads = express.Router();

downloads.get("/episodes/:episodeId/download", (req, res) => {
  const { episodeId } = req.params;
  let episode = Episode.load(episodeId);
  
  res.send( JSON.stringify(episode, null, 2) );
});

downloads.get("/episodes/:episodeId/download/csv", (req, res) => {
  const { episodeId } = req.params;
  let episode = Episode.load(episodeId);

  const records = episode.records.map( record => `${record.timestamp}, ${record.type}, ${record.description}, ${record.value}`).join("\n");
  const response = "timestamp, type, description, value\n" + records;
  
  res.send( response );
});



export default downloads;