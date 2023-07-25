import React, { useState, useEffect } from 'react';
import './MyCart.css';
import back_btn from './assets2/icons-8-back-501.png';
import cart_icon from './assets2/icons-8-cart-5011.png';
import minus_sign from './assets2/icons-8-minus-5011.png';
import plus_sign from './assets2/plus.png';
import { Helmet } from 'react-helmet';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, remove, onValue, set } from 'firebase/database';
import { Link } from 'react-router-dom';

const appSettings = {
  databaseURL: 'https://connoisseur-fd354-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const adminSettings = {
  databaseURL: 'https://cart-764ab-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const adminApp = initializeApp(adminSettings, 'admin');
const adminDatabase = getDatabase(adminApp);

const cartRef = ref(database, 'cartItems');
const dataRef = ref(adminDatabase, 'db-table');
const ordersRef = ref(adminDatabase, 'my-order')

// Function to generate a random 6-digit alphanumeric tracking ID
const generateTrackingId = () => {
  const characters = '0123456789';
  let trackingId = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    trackingId += characters[randomIndex];
  }
  return trackingId;
};


export default function MyCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartListener = onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.values(data);
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    });

    return () => {
      // Clean up the event listener when the component unmounts
      cartListener();
    };
  }, []);

  const handleCheckout = () => {
    const trackingId = generateTrackingId();
    cartItems.forEach((item) => {
      push(ordersRef, item)
      const { foodItemName, price, qty } = item;
      const orderData = {
        date: '11 July 2023',
        name: foodItemName,
        trackingId,
      };
      push(dataRef, orderData)
        .then(() => {
          console.log('Order pushed to my_orders collection successfully!');
        })
        .catch((error) => {
          console.error('Error pushing order to my_orders collection:', error);
        });
    });
  };
  

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].qty += 1;
    setCartItems(updatedCartItems);
    set(cartRef, updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].qty > 1) {
      updatedCartItems[index].qty -= 1;
      setCartItems(updatedCartItems);
      set(cartRef, updatedCartItems);
    } else {
      const dataIndexRef = ref(database, `cartItems/${index}`);
      remove(dataIndexRef);
    }
  };

  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="top_yellow_margin">
        <Link to="/menu">
          <div className="back-btn">
            <img src={back_btn} alt="Back Button" />
          </div>
        </Link>
        <div className="cart">
          <img src={cart_icon} className="cart-icon" alt="Cart Icon" />
          <div className="my-cart-text">My Cart</div>
        </div>
      </div>

      {cartItems.map((item, index) => (
        <div className="item-card" key={index}>
          <div className="food-img">
            <Link to="/menu">
              <img src={item.foodItemImage} alt={item.foodItemName} />
            </Link>
          </div>
          <div className="section-2">
            <div className="food-item-txt">
              <b>{item.foodItemName}</b>
            </div>
            <div className="qty">Qty: {item.qty}</div>
          </div>
          <div className="section-3">
            <div className="plus-minus">
              <div className="minus" onClick={() => decreaseQuantity(index)}>
                <img src={minus_sign} alt="Minus Sign" />
              </div>
              <div className="plus-qty-minus">{item.qty}</div>
              <div className="plus" onClick={() => increaseQuantity(index)}>
                <img src={plus_sign} alt="Plus Sign" />
              </div>
            </div>
            <div className="price">
              Total: <b className="bold-price">Rs. {item.qty*item.price}</b>
            </div>
          </div>
        </div>
      ))}

      <div className="checkout">
        <Link to="/orders">
          <button className="checkout-btn" onClick={handleCheckout}>
            <font className="checkout-txt">PROCEED TO CHECKOUT</font>
          </button>
        </Link>
      </div>
    </div>
  );
}
