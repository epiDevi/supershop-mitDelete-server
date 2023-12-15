import { ObjectId } from "mongodb";
import { dbo } from "../utils/db.js";

export async function addArticle(req, res) {
  const article = req.body;
  article.articleprice = Number(article.articleprice);
  article.imagepath = req.file.path;
  await dbo.collection("article").insertOne(article);
  res.status(201).end();
}

export async function getAllArticles(req, res) {
  const articles = await dbo.collection("article").find().toArray();
  res.json(articles);
}

export async function deleteArticle(req, res) {
  try {
    const id = req.params.id;
    console.log("ID==>", id);
    await dbo.collection("article").deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Artikle ist gelösht" });
  } catch (error) {
    console.error("fehler beim löschen", error);
    res.status(500).json({ error: "Fehler beim löschen" });
  }
}

// function getArtikle(id) {
//   const article = dbo.collection("artikle").find({ _id: ObjectId(id) });
//   return article;
// }
