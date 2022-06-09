const movies = require('./db.json');
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '193a48e96d8948b696216a8c7e3851e8',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


let globalID = 11;

module.exports = {
    getMovies: (req, res) => {
            res.status(200).send(movies)
    },
    deleteMovie: (req, res)=>{
        let index = movies.findIndex(elem => elem.id === +req.params.id)
        movies.splice(index, 1);
        console.log(movies);
        res.status(200).send(movies);
    },
    createMovies: (req, res) => {
        console.log(req.body);
        let {title, rating, imageURL} = req.body;
        let newMovie = {
            id: globalID,
            title,
            rating,
            imageURL,
        };

        movies.push(newMovie);
        globalID++;
        res.status(200).send(movies);
    },
    updateMovie: (req, res) => {
        let id = req.params.id;
        let type = req.body.type;

        let index = movies.findIndex((elem) => +elem.id === +id);

        if (movies[index].rating ===5 && type === 'plus'){
            res.status(400).send('cannot set a rating  above 5');
        } else if ((movies[index].rating === 0) & (type === 'minus')) {
            res.status(400).send('cannot set a rating below 0'); 
        }  else if (type === 'plus') {
            movies[index].rating++;
            res.status(200).send(mnovies);
        } else if (type === 'minus') {
            movies[index].rating--;
            res.status(200).send(movies);
        } else {
            res.sendStatus(400);
        }
    },

};