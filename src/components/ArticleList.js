import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import Article from './Article';

const ResponsiveGridLayout = WidthProvider(Responsive);

function ArticleList({ articles, onLike }) {
    // Generate layout for grid
    const generateLayout = () => {
        return articles.map((article, index) => ({
            i: article.id ? article.id.toString() : `article-${article.title}-${index}`, // Consistent key
            x: index % 3,
            y: Math.floor(index / 3) * 1.5, // Adjusting y value
            w: 1,
            h: 1.5  // Adjusting height
        }));
    };

    return (
        <ResponsiveGridLayout
            className="layout article-list"
            layouts={{ lg: generateLayout() }}
            cols={{ xxs: 1, xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
            rowHeight={300}
            width={1200}
            autoSize={true}
            margin={[10, 15]}
            draggableHandle=".drag-handle"
        >
            {articles.map((article, index) => (
                <div key={article.id ? article.id.toString() : `article-${article.title}-${index}`}> {/* Adjusted key */}
                    <Article article={article} onLike={() => onLike(article.id)} />
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}

export default ArticleList;
