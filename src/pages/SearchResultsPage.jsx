import React, { useContext, useState, useEffect } from 'react'
import { AuthContext, useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SearchResultsPage = ({ searchResults, setSearchResults }) => {
    const auth = useContext(AuthContext);
    const [selectedQuantity, setSelectedQuantity] = useState({});
    const { updatedQuantities, setUpdatedQuantities } = useAuth();

    const handleAddToCart = async (e, card, set) => {
        e.preventDefault();

        const setId = set._id;
        const cardId = card._id;
        console.log('the user', auth.user);

        const addToCartQuantity = selectedQuantity[setId] || 0;

        try {
            
            const response = await axios.post('https://cardz-galore-app-backend-cb5253dcc4a1.herokuapp.com/add-to-cart', {
                userId: auth.user._id,
                cardId,
                setId,
                quantity: addToCartQuantity,
            });

            if (response.status === 200) {
                const updatedQuantity = response.data.updatedQuantity;
                
                // Display toast notification
                toast.success('Item added to cart successfully!');
            }
        } catch (err) {
            console.error('Error adding item to cart:', err);
            toast.error('Failed to add item to cart. Please try again.');
        }
    };


    const handleQuantityChange = (e, setId) => {
        const quantity = parseInt(e.target.value);
        setSelectedQuantity(prevQuantity => ({
        ...prevQuantity,
        [setId]: quantity,
        }));
    };

    useEffect(() => {
        // This effect will run whenever updatedQuantities changes
        console.log('updatedQuantities changed:', updatedQuantities);
    }, [updatedQuantities]);



  return (
    <>
        <div className='flex'>
            {searchResults.length > 0 ? (
            searchResults.map((card) => (
                <div className='container mx-auto flex flex-col items-center justify-center w-full lg:w-11/12 lg:max-w-screen-lg lg:flex-row lg:flex-wrap xl:max-screen-w-xl 2xl:max-w-screen-2xl' key={card._id}>
                    {card.sets.map((set, index) => (
                        <div className='flex w-11/12 items-center justify-center mx-auto sm:w-10/12 md:w-9/12 lg:w-1/2 lg:mx-0 xl:w-5/12 xl:mx-2 2xl:w-5/12 m-2 p-2 shadow-lg rounded border-2' key={`${card._id}-${index}`}>
                        <div className='w-1/2'>
                            <img src={card.images[0]} alt={card.name} className='w-48 h-64 object-contain' />
                        </div>
                        <div className='w-1/2 pl-2'>
                            <h3 className='font-bold'>{card.name}</h3>
                            <p>Attribute: {card.attribute}</p>
                            <p className='truncate'>Level/Rank: {card.level}</p>
                            <p className='truncate'>ATK/DEF: {card.atk}/{card.def}</p>
                            <p className='truncate'>Set: {set.set_name}</p>
                            <p>Rarity: {set.set_rarity}</p>
                            <p>Price: <span className='font-bold'>${set.set_price}</span></p>
                            <form onSubmit={(e) => handleAddToCart(e, card, set)} className='flex items-center mt-4'>
                                <select 
                                    className='p-2 rounded shadow-sm mr-2'
                                    value={selectedQuantity[set._id] || 0}
                                    onChange={(e) => handleQuantityChange(e, set._id)}
                                >
                                    {Array.from({ length: set.quantity + 1}).map((_, index) => (
                                        <option key={index} value={index}>
                                            {index}
                                        </option>
                                    ))}
                                </select>
                                <button className='bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-1 py-2 rounded' type='submit'>Add to cart</button>
                            </form>
                        </div>
                        </div>
                    ))}
                </div>
            ))
            ) : (
            searchResults.length === 0 || searchResults.length === undefined ? (
                <div className='w-full my-8'>
                    <p className=' text-center text-3xl font-semibold'>No search results found!</p>
                </div>
            ) : (
                'Search for a card!'
            )
            )}
        </div>
    </>
  )
}

export default SearchResultsPage