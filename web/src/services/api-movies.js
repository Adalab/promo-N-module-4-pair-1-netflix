// login
//Cris: añado props que es el objeto  sta mandando el parametro desde App.js (params))
const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  console.log(params);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  // '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json'
  return fetch(`//localhost:4000/movies?gender=${params.gender}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
