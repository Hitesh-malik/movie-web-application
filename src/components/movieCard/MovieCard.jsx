import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

import { motion } from "framer-motion";


const   MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (

        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <motion.div
                className="box"
                initial={{ opacity: 0, scale:0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <div className="posterBlock">
                    <Img className="posterImg" src={posterUrl} />
                    {!fromSearch && (
                        <React.Fragment>
                            <CircleRating rating={data.vote_average.toFixed(1)} />
                            <Genres data={data.genre_ids.slice(0, 2)} />
                        </React.Fragment>
                    )}
                </div>
                <div className="textBlock">
                    <span className="title">{data.title || data.name}</span>
                    <span className="date">
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                    </span>
                </div>
            </motion.div>

        </div>
    );
};

export default MovieCard;
