import React, { useEffect, useState } from 'react';
import './MyCart.css';
import back_btn from './assets2/icons-8-back-501.png';
import order_icon from './assets2/icons8-order-100.png';
import { Helmet } from 'react-helmet';
import {initializeApp} from 'firebase/app';
import { getDatabase, ref, push, update, remove, onValue, set } from "firebase/database";
import { Link } from "react-router-dom"

const appSettings = {
  databaseURL: "https://connoisseur-fd354-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const orders = ref(database, 'my_orders');

export default function MyCart({ foodItems }) {
  const [my_orders, set_my_orders] = useState([]);

  useEffect(() => {

    onValue(orders, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.values(data);
        set_my_orders(items);
      }
      else{
        set_my_orders([]);
      }
    });
  }, []);

  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="top_yellow_margin">
        <Link to="/menu"><div className="back-btn">
          <img src={back_btn} alt="Back Button" />
        </div></Link>
        <div className="cart">
          <img src={order_icon} className="cart-icon" alt="Cart Icon" />
          <div className="my-cart-text">My Orders</div>
        </div>
      </div>

      {my_orders.map((item, index) => (
        <div className="item-card" key={index}>
          <div className="food-img">
            <img src={item["food-item-image"]} alt={item["food-item-txt"]} />
          </div>
          <div className="section-2">
            <div className="food-item-txt">
              <b>{item["food-item-txt"]}</b>
            </div>
            <div className="qty">Qty: {item["food-item-qty"]}</div>
          </div>
          <div className="price">
            Total: <b className="bold-price">Rs. {item["food-item-price"]}</b>
          </div>
        </div>
      ))}
    </div>
  );
}
