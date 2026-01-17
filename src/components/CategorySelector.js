import React from 'react';

const categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

function CategorySelector({ onSelectCategory }) {
    return (
        <div>
            {categories.map((category) => (
                <button key={category} onClick={() => onSelectCategory(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategorySelector;
