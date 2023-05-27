import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface StarRatingProps {
    rating?: number; // Make the rating prop optional
  }
  
  const StarRating: React.FC<StarRatingProps> = ({ rating = 0 }) => {
    const maxRating = 5; // Maximum rating value
    const fullStars = Math.round(rating); // Round the rating to the nearest integer
   // Define the color for the filled star icon
   const filledStarColor = '#ff9800'; // Replace with your desired color
   const outlinedStarColor = '#000000'; // Replace with your desired color


    const stars: React.ReactNode[] = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} style={{ color: filledStarColor }} />);
    }
    for (let i = fullStars; i < maxRating; i++) {
      stars.push(<StarOutlineIcon key={i} style={{ color: outlinedStarColor }}  />);
    }
  
    return <div className="rating">{stars}</div>;
  };
  
  export default StarRating;