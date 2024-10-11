import React, { useEffect, useState } from "react";
import "./Moveiapp.css";
import { AiOutlineSearch } from "react-icons/ai";

const Moveiapp = () => {
  const [search, setSearch] = useState('naruto');
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const resData = await res.json();
      setAnimeData(resData.data);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      getData();
    }, 300); // Debouncing search by 300ms

    return () => clearTimeout(debounce); // Clean up
  }, [search]);

  return (
    <div className="app-container">
      <h1>My Anime</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Anime..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button">
          <AiOutlineSearch />
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="anime-list">
        {animeData.length === 0 && !loading && <p className="no-results">No results found.</p>}
        {animeData.map(anime => (
          <div key={anime.mal_id} className="anime-item">
            <div className="anime-image-wrapper">
              <img src={anime.images.jpg.large_image_url} alt={anime.title} className="anime-image" />
            </div>
            <div className="anime-info">
              <h2 className="anime-title">{anime.title}</h2>
              <p className="anime-score">Score: {anime.score}</p>
              <p className="anime-episodes">Episodes: {anime.episodes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moveiapp;
