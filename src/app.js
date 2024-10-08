import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import cookiesRouter from './routes/cookies.router.js';
import sessionRouter from './routes/session.router.js';

const app = express();

// Configuración de motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));


mongoose.connect(config.app.MONGO.URL)
    .then(() => console.log('Mongoose connected to the database'))
    .catch((err) => console.error(`Mongoose connection error: ${err}`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', usersRouter);
app.use('/api/cookies', cookiesRouter);


app.get('/', (req, res) => {
    res.render('home');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(config.server.PORT, () => console.log(`Listening on PORT ${config.server.PORT}`));
