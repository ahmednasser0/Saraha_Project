import express from "express";
import initapp from "./app.router.js";
import dotenv from "dotenv";
import sendEmail from "./Utilis/sendEmail.js";
dotenv.config();
const app = express();
initapp(app, express);
// sendEmail({to:"mennawalid353@gmail.com" , text:"Hello from js" , html:"<h2>Hello from Me</h2>",attachments:[
//     {
//         filename:"lec.pdf",
//         contentType:"Lecture/pdf",
//         path:"./lec1.pdf"
//     }
// ]})
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
