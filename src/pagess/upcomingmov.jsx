import React from 'react';
import { Link } from 'react-router-dom';
import usePaginatedFetchTMDB from './sidebarfetch';
import './pages.css';
import SidebarDrawer from '../components/drawer';
import { Pagination } from '@mui/material'; 

const Popular = () => {
  const { data, loading, error, page, setPage } = usePaginatedFetchTMDB('/movie/upcoming');

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SidebarDrawer/>
      <p style={{ fontSize: '30px', padding: '30px', color: 'white',marginLeft:"60px",marginTop:"18px" }}>upcoming movies</p>
      <div className="movie-container">
        {data?.results?.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}` } style={{ textDecoration: 'none' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p style={{ color: 'white',}}>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>

      
      <div className="pagination-buttons" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Pagination
          count={data?.total_pages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </div>
    </div>
  );
};

export default Popular;
