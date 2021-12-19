import mariadb from "mariadb";
import { databaseConfigProps } from "../config.js";

const instance = mariadb.createPool(databaseConfigProps);

async function connectToDatabase() {
    try {
        const connection = await instance.getConnection();
        return connection;
    }
    catch (err) {
        throw err;
    }
}

async function getPosts(dbConnection) {
    try {
        const posts = await dbConnection.query("Select * from Posts");
        return posts;
    }
    catch (err) {
        console.error(err);
    }
}

async function getPost(dbConnection, dataTime) {
    try {
        const firma = "da";
        const post = await dbConnection.query("Select * from Posts WHERE Data_postare = ? and firma=?", [dataTime, "da"]);
        return post;
    }
    catch (err) {
        console.error(err);
    }
}

async function deletePost(dbConnection, postID) {
    try {
        await dbConnection.query("Delete from Posts WHERE postID = ?", [postID]);
    }
    catch (err) {
        console.error(err);
    }
}

async function createPost(dbConnection, post) {
    try {
        const { title, body, firma, data_postare } = post;
        await dbConnection.query(
            "INSERT INTO Posts (Title, Body, Firma, Data_postare) VALUES (?, ?, ?, ?)",
            [title, body, firma, data_postare],
            function handleError(err) {
                throw err;
            }
        );
    } catch (err) {
        throw err;
    }
}


export const databaseOperationsAPI = {
    connect: connectToDatabase,
    getPosts: getPosts,
    getPost: getPost,
    deletePost: deletePost,
    createPost: createPost,
};