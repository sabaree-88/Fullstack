import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    useEffect(() => {
        if (query) {
            debouncedSearch();
        }
    }, [query, category, minPrice, maxPrice, minRating, page]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`/api/search`, {
                params: {
                    query,
                    page,
                    limit,
                    category,
                    minPrice,
                    maxPrice,
                    minRating
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results', error);
        }
    };

    const debouncedSearch = debounce(fetchResults, 500);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setPage(1);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for products or categories"
            />

            <div>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Filter by Category"
                />
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                />
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                />
                <input
                    type="number"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    placeholder="Min Rating"
                />
            </div>

            <button onClick={handleSearch}>Search</button>

            <div>
                {results.map((product) => (
                    <div key={product._id}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default SearchBar;
