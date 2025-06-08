import express from "express";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";
import Document, { DocumentStatus } from "#models/document";

const documents = express.Router();



documents.post("/:documentId/refresh", async (req, res) => {
  const { documentId } = req.params;
  const document = Document.load(documentId);
  await document.refresh();

  if( document.status === DocumentStatus.OK ) {
    res.sendStatus("200");
  } else {
    res.sendStatus("400");
  }

  broadcast("documents");

});

documents.post("/:documentId", async (req, res) => {
  const { documentId } = req.params;
  const document = Document.load(documentId);
  console.log( req.body );
  document.update( req.body );

  await document.refresh();

  if( document.status === DocumentStatus.OK ) {
    res.sendStatus("200");
  } else {
    res.sendStatus("400");
  }

  broadcast("documents");

});


documents.delete("/:documentId/:episodeId", async (req, res) => {
  const { episodeId, documentId } = req.params;
  const episode = await Episode.load(episodeId);
  episode.deleteDocumentById(documentId);
  episode.save();

  res.sendStatus("200");
  broadcast("documents");
});




export default documents;