const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');

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
  console.log(genderFilterParam);
  res.json(movies);
});

const staticServerPathWeb = './public'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerPathWeb2 = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb2));
