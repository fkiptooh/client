import React from "react";
import { Card, Skeleton } from "antd";

// const LoadingCard =({count})=> {
    
//     const cards =()=> {
//         let totalCards = [];
//         for(let i = 0; i < count; i++) {
//             totalCards.push(
//                 <Card key={cards._id} className="col m-3">
//                     <Skeleton key= {i._id} active></Skeleton>
//                 </Card>
//             );
//         }

//         return totalCards;
//     }
    
//     return <div className="row pb-5">{cards()}</div>

// }

// export default LoadingCard;
const LoadingCard = ({ count }) => {
    const cards = () => {
      let totalCards = [];
  
      for (let i = 0; i < count; i++) {
        totalCards.push(
          <Card className="col-md-4">
            <Skeleton active></Skeleton>
          </Card>
        );
      }
  
      return totalCards;
    };
  
    return <div className="row pb-5">{cards()}</div>;
  };
  
  export default LoadingCard;