import express from "express";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";
import Document, { DocumentStatus } from "#models/document";

const documents = express.Router();



documents.post("/:episodeId", async (req, res, next) => {
  try {
  const { episodeId } = req.params;
  const episode = await Episode.load(episodeId);
  const document = new Document(req.body);

  episode.addDocument( document );
  episode.save();

  await document.refresh();

  res.sendStatus("200");
  broadcast("documents");
} catch(err) {
  next(err);
}
});




documents.post("/:episodeId/:documentId/refresh", async (req, res, next) => {
  try {
  const { episodeId, documentId } = req.params;
  const episode = await Episode.load( episodeId );
  const document = episode.getDocumentById(documentId);

  await document.refresh();

  if( document.status === DocumentStatus.OK ) {
    res.sendStatus("200");
  } else {
    res.sendStatus("400");
  }

  broadcast("documents");
} catch(err) {
  next(err);
}
});

documents.post("/:episodeId/:documentId", async (req, res, next) => {
  try {
  const { episodeId, documentId } = req.params;
  const episode = await Episode.load( episodeId );
  const document = episode.getDocumentById(documentId);

  document.update( req.body );
  await document.refresh();

  episode.save();

  if( document.status === DocumentStatus.OK ) {
    res.sendStatus("200");
  } else {
    res.sendStatus("400");
  }

  broadcast("documents");
} catch(err) {
  next(err);
}
});


documents.delete("/:episodeId/:documentId", async (req, res, next) => {
  try {
  const { episodeId, documentId } = req.params;
  const episode = await Episode.load(episodeId);
  episode.deleteDocumentById(documentId);
  episode.save();

  res.sendStatus("200");
  broadcast("documents");
} catch(err) {
  next(err);
}
});




export default documents;