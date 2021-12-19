import { response } from "express";
import { router } from "../server-init.js"
import { databaseOperationsAPI } from "./operations-api.js";

let connection;

if (!connection) databaseOperationsAPI.connect().then(con => {
    connection = con;
    console.log("Succesfully connected to the database!")
})
    .catch(err => console.err(err));

/*Routes*/
router.route("/check-status")
    .get(function sendStatusResponse(_, response) {
        response.status(200).json("All good! System time: ${new Date()}");
    });

router.route("/posts")
    .get(async function getPosts(_, response) {
        const posts = await databaseOperationsAPI.getPosts(connection);
        response.status(200).json(posts);
    });

router.route("/posts/firma/:dataTime")
    .get(async function getPost(request, response) {
        const postDataTime = request.params.dataTime;
        const post = await databaseOperationsAPI.getPost(connection, postDataTime);
        response.status(200).json(post);
    });

router.route("/posts/delete/:postID")
    .delete(async function deletePost(request, response) {
        const postID = +request.params.postID;
        await databaseOperationsAPI.deletePost(connection, postID);
        response.status(200).json("S-a sters cu succes!");
    });


router.route("/posts")
    .post(async function createPost({ body: post }, response) {
        try {
            await databaseOperationsAPI.createPost(connection, post);
            response.status(200).json("A fost adaugat cu succes!");
        } catch (err) {
            console.error(err);
            response.status(500).json("Internal server error!");
        }
    });
/*Routes*/