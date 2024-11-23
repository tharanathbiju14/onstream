import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchTMDB from './tmbdfetch';
import './MovieDetails.css';
import SidebarDrawer from './drawer';
import { CircularProgress } from '@mui/material'; 

export default function MovieDetails() {
  const { id } = useParams();  
  const { data, loading, error } = useFetchTMDB(`/movie/${id}`, { language: 'en-US' });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={60} /> {/* Loader with styling */}
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No details found.</p>;

  return (
    <div
      className="movie-details-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,  
      }}
    >
      <SidebarDrawer />
      <div className="movie-details-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}  
          alt={data.title}
          className="movie-poster"
        />
        <div className="movie-details-content">
          <div>
            <h2>{data.title}</h2>
            <p className="movie-overview">{data.overview}</p>
            <div className="movie-rating">
              <span>⭐ {data.vote_average.toFixed(1)}/10</span>
              <span>({data.vote_count} votes)</span>
            </div>
            <p className="movie-runtime">Runtime: {data.runtime} minutes</p>
            <p>Release Date: {data.release_date}</p>
          </div>
          {data.homepage && (
            <a href={data.homepage} target="_blank" rel="noopener noreferrer">
              Visit Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
