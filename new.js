import React from 'react';
import './MyCart.css';
import { Helmet } from 'react-helmet';
import images from './new_data.json'; // Import the JSON file

export default function MyCart({ foodItems }) {
  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
      </Helmet>
      {/* Rest of the code */}
      
      {foodItems && foodItems.map((item, index) => (
        <div className="item-card" key={index}>
          {/* Other item card content */}
          <div className="food-img">
            <img src={item["food-item-image"]} alt={item["food-item-txt"]} />
          </div>
          {/* Rest of the item card content */}
        </div>
      ))}

      {/* Dynamically render images from the imported JSON */}
      {images.images.map((image, index) => (
        <img src={image.src} alt={image.alt} key={index} />
      ))}

      {/* Rest of the code */}
    </div>
  );
}
