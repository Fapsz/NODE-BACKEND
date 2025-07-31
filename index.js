import e from "express";
import path from 'path';
import { fileURLToPath } from "url";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'
import CommentRoutes from './routes/commentRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { get } from "http";
import { config } from "dotenv";
import cors from 'cors';
config()
const app = e();
const port = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGODB_URL = process.env.MONGODB_URI


mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Mongodb connected successfully");
    })
    .catch((err) => {
        console.error(" Mongodb connection failed", err);
    });
app.use(cookieParser());


app.use(e.json());
app.use(e.urlencoded({extended:true}))

app.use(e.static('./box'))

app.use(cors({
    origin: ['http://localhost:5173' ,"https://connection-react-xi.vercel.app/"],
    credentials: true,
}));        

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'box','index.html'))
})

// app.post("/register", forSignup);

app.use('/user', userRoutes);
app.use('/comment', CommentRoutes);
app.use('/post', postRoutes);


// app.get('/user', getAllUsers)

// app.get('/user/:id', get1user)

// app.delete('/user/:id', del1user)

// app.put('/user/:id', update1user)


// app.get('/post', getAllPosts)

// app.get('/post/:id', get1post)

// app.delete('/post/:id', del1post)

// app.put('/post/:id', update1post)

// app.post('/create',(req,res)=>{
//     let {firstname,lastname,email,password,Age,Gender} = req.body

//     let myTable = `
        
//     <table border="1">
//         <thead>
//             <tr>
//                 <th>FirstName</th>
//                 <th>LastName</th>
//                 <th>Email</th>
//                 <th>Password</th>
//                 <th>Age</th>
//                 <th>Gender</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${firstname}</td>
//                 <td>${lastname}</td>
//                 <td>${email}</td>
//                 <td>${password}</td>
//                 <td>${Age}</td>
//                 <td>${Gender}</td>
//             </tr>
//         </tbody>
//     </table>
//     `

//     res.send(myTable)
// })

// app.post('/create',(req,res)=>{
//     let myTable = `
        
//     <table border="1">
//         <thead>
//             <tr>
//                 <th>FirstName</th>
//                 <th>LastName</th>
//                 <th>Email</th>
//                 <th>Password</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${req.body.firstname}</td>
//                 <td>${req.body.lastname}</td>
//                 <td>${req.body.email}</td>
//                 <td>${req.body.password}</td>
//             </tr>
//         </tbody>
//     </table>
//     `

//     res.send(myTable)
// })


// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname,'box','about.html'))
// })


app.listen(port,()=>{
    console.log(`server is runninng on port : ${port}`)
    // console.log("server is running on port " + port)
})
