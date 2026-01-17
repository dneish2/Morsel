import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ArticleList from './components/ArticleList';
import { fetchArticles } from './services/newsService.js';  
import './App.css';
import Toggle from './components/Toggle';

function App() {
    const [articles, setArticles] = useState([]); 
    const [likedArticles, setLikedArticles] = useState(new Set()); // Track IDs of liked articles
    const [showOnlyLiked, setShowOnlyLiked] = useState(false); // Toggle state

    // Define the categories list
    const categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

    const handleSearch = async (query) => {
        let fetchedArticles;
    
        if (categories.includes(query)) {
            // Query matches a predefined category
            fetchedArticles = await fetchArticles('', query);
        } else {
            // Regular search query
            fetchedArticles = await fetchArticles(query);
        }
    
        const articlesWithIds = fetchedArticles.map((article, index) => {
            return {
                ...article,
                id: article.id || `article-${index}`
            };
        });
        setArticles(articlesWithIds);
    };
        
    const toggleShowLiked = () => {
        setShowOnlyLiked(!showOnlyLiked);
    };

    const handleLike = (articleId) => {
        setLikedArticles(prevLiked => {
            const newLiked = new Set(prevLiked);
            if (newLiked.has(articleId)) {
                newLiked.delete(articleId);
            } else {
                newLiked.add(articleId);
            }
            console.log("Updated likedArticles:",  newLiked);
            return newLiked;
        });
    };

    const displayedArticles = showOnlyLiked 
    ? articles.filter(article => likedArticles.has(article.id)) 
        : articles;
    
    return (
        <div className="App">
            <Header />
            <SearchBar onSearch={handleSearch} />
            {/* <CategorySelector onSelectCategory={handleSelectCategory} /> */}
            <Toggle onToggle={toggleShowLiked} isActive={showOnlyLiked} />
            <ArticleList articles={displayedArticles} onLike={handleLike} />
        </div>
    );
}

export default App;
