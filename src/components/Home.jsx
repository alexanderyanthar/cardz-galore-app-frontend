import HeroSection from './HeroSection';
import ImageCarousel from './ImageCarousel';
import image1 from '../assets/promo-banner-placeholder1.png';
import image2 from '../assets/promo-banner-placeholder.png';
import image3 from '../assets/promo-banner-placeholder.png';
import image4 from '../assets/promo-banner-placeholder.png';
import FeaturedCardsContainer from './FeaturedCardsContainer';
import Footer from './Footer';



const Home = () => {

  const images = [
    image1,
    image2,
    image3,
    image4,
  ]
  
  return (
    <>
        <HeroSection />
        <ImageCarousel images={images} />   
        <FeaturedCardsContainer /> 
        <Footer />
    </>
  )
}

export default Home