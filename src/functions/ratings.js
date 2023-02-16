import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage =(p)=> {
    if(p && p.ratings){
        let ratingArray = p && p.ratings;
        let total = [];
        let length = ratingArray.length;

        // ratingArray.map((r)=> total.push(r.star));
        ratingArray.forEach((r) => {
            if (Array.isArray(r.star)) {
              total.push(...r.star);
            } else {
              total.push(r.star);
            }
          });
        let totalReduced = total.reduce((p, n)=> p + n, 0);
        // console.log(totalReduced)

        let highest = length * 5;
        // console.log(highest)

        let result = Math.round((totalReduced * 5)/highest);
        // console.log(result)

        return(
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRatings
                        rating={result}
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="red"
                        editing={false}
                    />{" "}
                    ({p.ratings.length})
                </span>
            </div>
        )
    }
}