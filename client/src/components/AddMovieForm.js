import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
    id: 0,
    title: "",
    director: "",
    metascore: 0,
    genre: "",
    description: ""
}

export default function AddMovieForm(props) {
    const [ newMovie, setNewMovie ] = useState(initialFormValues)

    const { push } = useHistory()

    const handleChange = (e) => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', newMovie)
            .then(res => {
                console.log(res)
                props.setMovies(res.data)
                push('/movies')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label htmlFor='title' />Title
                <input 
                    name='title'
                    value={newMovie.title}
                    onChange={handleChange}
                />
                <label htmlFor='director' />Director
                <input 
                    name='director'
                    value={newMovie.director}
                    onChange={handleChange}
                />
                <label htmlFor='metascore' />Metascore
                <input 
                    type='number'
                    name='metascore'
                    value={newMovie.metascore}
                    onChange={handleChange}
                />
                <label htmlFor='genre' />Genre
                <input               
                    name='genre'
                    value={newMovie.genre}
                    onChange={handleChange}
                />
                <label htmlFor='description' />Description
                <input 
                    name='description'
                    value={newMovie.description}
                    onChange={handleChange}
                />
                <button>SUBMIT</button>
            </form>
        </div>
    )
}
