import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import AuthService from './services/AuthService.js';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import cookiesRouter from './routes/cookies.router.js';
import sessionRouter from './routes/session.router.js';

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));


mongoose.connect(
  'mongodb+srv://herrerapatriciadg:Gu4r1p0l0@clustersaurio.kjwdhw2.mongodb.net/KP?retryWrites=true&w=majority&appName=ClusterSaurio'
).then(() => {
  console.log('Mongoose connected to the database');
}).catch((err) => {
  console.error(`Mongoose connection error: ${err}`);
});

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret:"nobodys gonna know!",
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://herrerapatriciadg:Gu4r1p0l0@clustersaurio.kjwdhw2.mongodb.net/KP?retryWrites=true&w=majority&appName=ClusterSaurio',
    ttl:60
  })
  }
));

app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', usersRouter);
app.use('/api/cookies', cookiesRouter);

app.use((req, res, next) => {
  console.log("Processing new middleware");
  next();
});
app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send("OK");
});

/*app.get('/login', (req,res)=>{
  const loginUser = {
    firstName: "",
    role: "user"
  }
  req.session.user = loginUser;
  res.send("ok");
});

app.get ('/logout', (req,res)=>{
  req.session.destroy((error)=>{
    if(error) return res.status(500).send("Logout has failed");
    res.send("Logout sucessful");
  })
})
app.get('/profile',(req, res)=>{
  console.log(req.session.user);
  res.send("everything OK")
});

app.get ('/counter', (req, res)=>{
  if(req.session.counter){
    res.send (`Endpoint has been visited ${++req.session.counter} times`)
  } else {
    req.session.counter = 1;
    res.send("Welcome to this endpoint")
    }
});

app.get('/current',(req, res)=>{
  console.log(req.session.user);
  res.send(req.session.user);
}) 
  */