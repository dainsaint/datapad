import express from "express";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";
import Document, { DocumentStatus } from "#models/document";

const documents = express.Router();



documents.post("/documents/:documentId/refresh", async (req, res) => {
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

documents.post("/documents/:documentId", async (req, res) => {
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


documents.post("/episodes/:episodeId/documents/", async (req, res) => {
  console.log('sup');
  const { episodeId } = req.params;
  const episode = Episode.load(episodeId);
  const document = new Document(req.body);
  
  episode.documentIds.push( document.id );
  episode.save();

  await document.refresh();

  res.sendStatus("200");
  broadcast("documents");
});


documents.delete("/episodes/:episodeId/documents/:documentId", async (req, res) => {
  const { episodeId, documentId } = req.params;
  const episode = Episode.load(episodeId);
  episode.deleteDocumentById(documentId);
  episode.save();

  res.sendStatus("200");
  broadcast("documents");
});




export default documents;