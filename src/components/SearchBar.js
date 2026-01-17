import React, { useState, useRef, useEffect } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const searchBarRef = useRef(null);

    const sentence = "What's new in "
    const popularKeywords = ["Technology", "Sports", "Business", "Entertainment", "Health", "Science"];
    const dummyKeywords = [
    "Quantum Computing Revolution: TechX Announces Superfast Processor",
    "Eco-Village Startup EarthlyHaven Goes Global with Sustainable Living",
    "AI-Powered Robot Chef 'CulinaBot' Creates Gourmet Meals in Minutes",
    "Virtual Reality Theme Park 'DreamScape World' Offers Immersive Experiences",
    "Self-Healing Tech Materials: A Leap in Durable Gadget Innovation",
    "Underwater Drones Explore Titanic: Revealing Hidden Mysteries"
];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        
        if (value) {
            const filteredKeywords = popularKeywords.filter(keyword => 
                keyword.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(getRandomSuggestions(filteredKeywords, 4));
        } else {
            setSuggestions([...getRandomSuggestions(popularKeywords, 4), ...getRandomSuggestions(dummyKeywords, 2)]);
        }
    };
    
    const handleFocus = () => {
        if (query) {
            const filteredKeywords = popularKeywords.filter(keyword => 
                keyword.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(getRandomSuggestions(filteredKeywords, 4));
        } else {
            setSuggestions([...getRandomSuggestions(popularKeywords, 4), ...getRandomSuggestions(dummyKeywords, 2)]);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleClearSearch = () => {
        setQuery('');
        setSuggestions(popularKeywords);
        searchBarRef.current.focus();
    };

    return (
        <div className="search-bar" ref={searchBarRef}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    size="100"
                    value={query} 
                    onChange={handleInputChange} 
                    onFocus={handleFocus}
                    placeholder="Search for articles..."
                />
                {query && (
                    <button type="button" onClick={handleClearSearch} className="clear-button">
                        &#10005; {/* Unicode for a clear (X) symbol */}
                    </button>
                )}
                <button type="submit">Search</button>
            </form>
            <div className="suggestions">
                {suggestions.map(suggestion => (
                    <div 
                        key={suggestion} 
                        onClick={() => {
                            setQuery(sentence + suggestion);
                            onSearch(suggestion);
                        }}
                        className="suggestion-item"
                    >
                        {sentence + suggestion}
                    </div>                
                ))}
            </div>
        </div>
    );
}

function getRandomSuggestions(keywords, count) {
    const shuffled = [...keywords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export default SearchBar;
