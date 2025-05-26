import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/tmdb';

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
    <div className="home_page container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>

      {loading && <div className="text-center mt-8">Loading...</div>}
      {error && <div className="text-center mt-8 text-red-500">{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-500 mb-2">Release Date: {movie.release_date}</p>
                <p className="text-gray-700 line-clamp-3">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center mt-8">No popular movies available.</div>
      )}
    </div>
  );
}