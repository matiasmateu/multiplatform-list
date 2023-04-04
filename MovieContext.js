import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create MovieContext
const MovieContext = createContext();

// MovieContextProvider component
export function MovieContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(()=>{
    fetchMovies();
  },[page])

  async function fetchMovies() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=daa6cb4ab335c8af806bd47a0e1f8cc7&language=en-US&page=${page}`
      );
      setMovies((prevState)=>prevState.concat(response.data.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  const value = {
    movies,
    page,
    setPage,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;

}

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieContextProvider');
  }
  return context;
}   