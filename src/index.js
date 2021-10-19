const express = require('express');
const cors = require('cors');
//const movies = require('./data/movies.json');
const users = require('./data/users.json');
const DataBase = require('better-sqlite3');

const db = new DataBase('./src/data/database.db', {
  verbose: console.log,
});

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  console.log(genderFilterParam);
  // const sortFilter = req.query.sort;
  // console.log(sortFilter);
  // el sortFilter recibe undefined

  if (genderFilterParam !== 'All') {
    const query = db.prepare(
      `SELECT * FROM movies WHERE gender =? ORDER BY name asc`
    );
    const foundFilm = query.all(genderFilterParam);

    //console.log(foundFilm);
    res.json({ success: true, movies: foundFilm });
  } else {
    const queryAll = db.prepare(`SELECT*FROM movies ORDER BY name asc`);
    const allMovies = queryAll.all();

    res.json({ success: true, movies: allMovies });
  }
});

server.post('/login', (req, res) => {
  console.log(req.body);
  const userFind = users.find((user) => user.email === req.body.email);
  console.log(userFind);
  const response = {};
  if (!userFind) {
    response.success = false;
    response.errorMessage = ' Usuaria/o no encontrado';
  } else {
    response.success = true;
    response.userId = userFind.id;
  }
  res.json(response);
});

server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);

  // renderizamos con el motor de plantillas
  const query = db.prepare('SELECT * FROM movies WHERE id=?');
  const foundMovie = query.get(req.params.movieId);
  res.render('films', foundMovie);
});

server.post('/signup', (req, res) => {
  const query = db.prepare(
    'SELECT * FROM users WHERE email= ? AND password = ?'
  );
  const foundUser = query.get(req.body.email, req.body.password);
  console.log(foundUser);

  if (foundUser === undefined) {
    //si la usuario no existe devuelvo un error
    const queryInsert = db.prepare(
      'INSERT INTO users(email, password) values (?,?)'
    );
    const userInsert = queryInsert.run(req.body.email, req.body.password);

    res.json({ success: true, userId: 'nuevo-id-añadido' });
  } else {
    //si la usuario existe  devuelvo
    res.json({
      success: false,
      errorMessage: 'usuario ya existente, no lo incluyas mas',
      userId: foundUser.id,
    });
  }
});

// peliculas favoritas getUserMoviesFromApi (api-user)
server.post('/my-movies', (req, res) => {});

const staticServerPathWeb = './public'; // En esta carpeta ponemos los ficheros estáticos del proyecto completo de react
server.use(express.static(staticServerPathWeb));

const staticServerPathWeb2 = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos de las imagenes
server.use(express.static(staticServerPathWeb2));
