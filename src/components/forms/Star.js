import React from "react";
import StarRatings from "react-star-ratings";

const Star=({starClicks, numberOfStars})=><>
    <StarRatings
        changeRating={()=> starClicks(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
    />
    <br/>
</>

export default Star;
