import React, {useEffect, useState} from 'react';
import Youtube from 'react-youtube';
import {imageUrl, API_KEY} from "../../constants/constants";
import './RowPost.css';
import axios from '../../constants/axios';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState(null);
    // const [scrollInterval, setScrollInterval] = useState(null);

    useEffect(() => {
        axios
            .get(props.url)
            .then((res) => {
                setMovies(res.data.results)
            })
            .catch(err => {
                // alert('network error')
            })

        }, [props.url]);

   

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: '1'
        }
    };

    const handleMovie = (id) => {
        axios
            .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(res => {
                if (res.data.results.length !== 0) {
                    setUrlId(res.data.results[0].key);
                } else {
                    console.log("no trailer for this movie in youtube");
                }
            });
    }

    const handleClick = () => {
        setUrlId(null);
    }

    return (
        <div className='row' onClick={handleClick}>
            <h2>{props.title}</h2>
            <div className='posters'>
                {
                    movies.map(
                        (obj) => <img
                            onClick={() => handleMovie(obj.id)}
                            className={props.isSmall
                                ? 'smallPoster'
                                : 'poster'}
                            src={`${imageUrl + obj.poster_path}`}
                            alt={obj.title}
                            key={obj.id}/>
                    )
                }
            </div>
            {urlId && <Youtube videoId={urlId} opts={opts}/>}
        </div>
    );
}

export default RowPost;
