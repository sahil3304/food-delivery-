import React, { useEffect, useRef, useState } from 'react';
import './popup.css';
import { Helmet } from 'react-helmet';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, push, set } from 'firebase/database';
import minus from "./assets2/minus-popup.png";
import plus from "./assets2/plus-popup.png";
import tagImg from "./assets2/tag.png";
import veg from "./assets2/veg-popup.png";
import non_veg from "./assets2/red-dot.png";
import {Link} from "react-router-dom";
const appSettings = {
  databaseURL: "https://connoisseur-fd354-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const getVegNonVegImage = (isVeg) => {
  return isVeg ? veg : non_veg;
}

export default function Popup({ onClose, selectedItemIndex }) {
  const popupRef = useRef(null);
  const cartItemsRef = ref(database, 'cartItems');
  const [popupData, setPopupData] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const popupDataRef = ref(database, 'popupData');
    const fetchData = () => {
      onValue(popupDataRef, (snapshot) => {
        const data = snapshot.val();
        setPopupData(data[selectedItemIndex]);
      });
    };

    fetchData();

    return () => {
      // Cleanup the event listener when the component is unmounted
      off(popupDataRef);
    };
  }, [selectedItemIndex]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const addItemToCart = (item) => {
    const { desc, outlet_name, tag, veg, ...updatedItem } = item;
    updatedItem['foodItemImage'] = item['foodItemImage'].replace('-popup', '-mycart');
    const cartItemsRef = ref(database, 'cartItems');
    const newCartItemRef = push(cartItemsRef);
    set(newCartItemRef, updatedItem);
  };
  
  if (!popupData) {
    return null; // Render nothing if the data is not available yet
  }

  const { foodItemImage, price, tag, foodItemName, veg, desc } = popupData;
  const vegNonVegImage = getVegNonVegImage(veg);

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
        </Helmet>
        <div className='item-image'>
          <div className='food-item-image'><img src={foodItemImage} alt="Food Item" /></div>
          {tag && <div className='tag-div'><img src={tagImg} alt="Tag" /></div>}
          <div className='price'><span className='price-txt'>₹ {price}</span></div>
        </div>
        (
          <div className='Bestseller-div'>
            <div className='outer-rect'><span className='bestseller'>{tag}</span></div>
          </div>
        )
        <div className='item-name-div'><span className='item-name'>{foodItemName}</span></div>
        <div className='veg-non-veg'><img src={vegNonVegImage} alt={veg ? "Veg" : "Non-Veg"} /></div>
        <div className='desc'>
          <div className='desc-text'>
            {desc}
          </div>
        </div>
        <div className='minus-qty-plus'>
          <div className='minus'><img src={minus} alt="Minus" /></div>
          <div className='qty'><span className='qty-txt'>1</span></div>
          <div className='plus'><img src={plus} alt="Plus" /></div>
        </div>
        <div className='add-to-cart-div'><Link to='/cart'><button className='add-to-cart' onClick={() => addItemToCart(popupData)}>ADD TO CART</button></Link></div>
      </div>
    </div>
  );
}