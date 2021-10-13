const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const users = require('./data/users.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  // console.log(genderFilterParam);
  // console.log(movies);
  // const filteredMovies = movies.filter((movie) => {
  //   movie.gender === genderFilterParam.gender;
  // });

  res.json(movies);
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
    response.errorMessage = ' id_de_la_usuaria_encontrada';
  }
  res.json(response);
});

const staticServerPathWeb = './public'; // En esta carpeta ponemos los ficheros estáticos de el proyecto compleo
server.use(express.static(staticServerPathWeb));

const staticServerPathWeb2 = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos de las imagenes
server.use(express.static(staticServerPathWeb2));
