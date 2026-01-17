import React, { useState } from 'react';
import Select from 'react-select';
import { Button, ToggleButton, ToggleButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

import LikeButton from './LikeButton';
import ContextMenu from './ContextMenu'; // Assuming this is already defined as per your example
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Article({ article, onLike }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [modalOpen, setModalOpen] = useState(false);
    const [reportDetails, setReportDetails] = useState({ tone: '', format: '' });

    const handleShare = () => {
        console.log(`Sharing ${article.title}`);
    };

    const handleSave = () => {
        console.log(`Saving ${article.title}`);
    };

    const handleReport = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const toneOptions = [
        { value: 'concise', label: 'Concise' },
        { value: 'modern', label: 'Modern' },
        { value: 'analytical', label: 'Analytical' }
    ];

    const lengthOptions = [
        { value: 'tweet', label: 'Short' },
        { value: 'wide', label: 'Medium' },
        { value: 'article', label: 'Long' }
    ];

    const images = [article.urlToImage || article.image_url, require('../assets/Modern_technology_search_company_landing_transparent_b_868bb929-8264-4368-b09e-0d79ffe5a10f.png'), 'image3.jpg'];

    // Submit form data or handle it according to your requirements
    const handleSubmitReport = () => {
        console.log('Report details:', reportDetails);
        handleCloseModal();
        // Implement submission logic here
    };

    return (
        <div className="article">
            <h2>{article.title}</h2>
            <img src={article.urlToImage || article.image_url} alt={article.title} />
            
            <p>{article.description}</p>
            <a href={article.url || article.source_url} target="_blank" rel="noopener noreferrer">Read more</a>
            <LikeButton articleId={article.id} onLike={onLike} />
            <ContextMenu onShare={handleShare} onSave={handleSave} onReport={handleReport} />

            {/* Modal for report form */}
            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                fullScreen={fullScreen}
                PaperProps={{
                    style: {
                        overflow: 'visible', // Allows dropdown to be visible outside the dialog container
                    },
                }}
            >
                <DialogTitle>The Modification of a Morsel</DialogTitle>
                <DialogContent>
                    <Carousel>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                    {/* Rest of the code */}
                </DialogContent>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup
                        exclusive
                        value={reportDetails.tone}
                        onChange={(event, newTone) => {
                            handleInputChange({
                                target: {
                                    name: 'tone',
                                    value: newTone,
                                },
                            });
                        }}
                        aria-label="tone"
                        style={{ padding: '1.5em' }}
                    >
                        <ToggleButton value="tweet" aria-label="lengthOption">
                            <ShortTextIcon />
                        </ToggleButton>
                        <ToggleButton value="wide" aria-label="lengthOption">
                            <SubjectIcon />
                        </ToggleButton>
                        <ToggleButton value="article" aria-label="lengthOption">
                            <FormatAlignJustifyIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={toneOptions[0]}
                    isClearable={true}
                    isSearchable={true}
                    name="tone"
                    options={toneOptions}
                    placeholder="Select Tone..."
                    onChange={selectedOption => {
                        handleInputChange({
                            target: {
                                name: 'tone',
                                value: selectedOption ? selectedOption.value : '',
                            },
                        });
                    }}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: base => ({
                            ...base,
                            zIndex: 9999, // Ensures the menu is above other components
                        }),
                    }}
                />

                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSubmitReport}>Moderneyes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Article;
