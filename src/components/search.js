import React, { useState } from 'react';
import axios from 'axios';
import './search.css'; 

const Search = () => {
    const [query, setQuery] = useState('');
    const [fields, setFields] = useState(''); 
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); 

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.get(`http://127.0.0.1:8000/search/?query=${query}&fields=${fields}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="container">
            <h1 className="heading">EpiRecipes Search Platform</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Fields (comma-separated)"
                    value={fields}
                    onChange={(e) => setFields(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {loading ? (
                    <div className="skeleton-loader">
                        <li className="skeleton-title"></li>
                        <li className="skeleton-line"></li>
                        <li className="skeleton-line"></li>
                        <li className="skeleton-line"></li>
                    </div>
                ) : (
                    results.map((recipe) => (
                        <li key={recipe.id}>
                            <h2>{recipe.title}</h2>
                            {Object.entries(recipe).map(([key, value]) => (
                                <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</p>
                            ))}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Search;
