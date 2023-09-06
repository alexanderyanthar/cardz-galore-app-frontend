import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeaturedCards from '../components/FeaturedCards'; // Import the presentational component

const FeaturedCardContainer = () => {
  const [randomCards, setRandomCards] = useState([]);

  useEffect(() => {
    // Fetch data from the /api/featured-cards endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cardz-galore-app-backend-cb5253dcc4a1.herokuapp.com/api/featured-cards'); // Use the new endpoint
        const featuredCards = response.data;

        setRandomCards(featuredCards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data only once when the component mounts
  }, []);

  return <FeaturedCards randomCards={randomCards} />; // Pass the fetched data to the presentational component
};

export default FeaturedCardContainer;
