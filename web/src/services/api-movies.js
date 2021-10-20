// login

const getMoviesFromApi = (props) => {
  console.log('Se están pidiendo las películas de la app');
  console.log(props.sort);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  // '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json'

  //preguntar como podemos pasar sort en paramns... &sort=${props.sort}

  return fetch(
    `//localhost:4000/movies?gender=${props.gender}&sort=${props.sort}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
