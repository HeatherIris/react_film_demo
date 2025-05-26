import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/tmdb';
import './Home.css';

// Define Movie type
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const resp = await getPopularMovies();
        // support axios or interceptor returning data directly
        const results = resp?.data?.results ?? (Array.isArray((resp as any).results) ? (resp as any).results : []);
        if (results.length === 0) {
          console.warn('No movie results found or unexpected response shape:', resp);
        }
        setMovies(results);
      } catch (err) {
        console.error('Failed to fetch popular movies:', err);
        setError('Failed to load popular movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <h1>Popular Movies</h1>

      {loading && <div className="status">Loading...</div>}
      {error && <div className="status status--error">{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-content">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-date">Release Date: {movie.release_date}</p>
                <p className="movie-overview">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="status">No popular movies available.</div>
      )}
    </div>
  );
}