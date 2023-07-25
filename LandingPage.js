import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import menu_icon from './assets2/menu.png';
import right_arrow_icon from './assets2/vector-11.png';
import { Helmet } from 'react-helmet';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import Popup from './popup';
import veg from "./assets2/green-dot.png";
import non_veg from "./assets2/red-dot.png";

const appSettings = {
  databaseURL: "https://connoisseur-fd354-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsRef = ref(database, 'menuPage');

export default function LandingPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const flattenedMenuItems = Object.values(data).flat();
          setMenuItems(flattenedMenuItems);
        }
      });
    };

    fetchData();

    return () => {
      off(itemsRef);
    };
  }, []);

  const togglePopup = (itemIndex) => {
    setSelectedItemIndex(itemIndex);
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    const outletName = item.outlet_name;
    if (!acc[outletName]) {
      acc[outletName] = [];
    }
    acc[outletName].push(item);
    return acc;
  }, {});

  return (
    <div className='LandingPage container'>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap" rel="stylesheet" />
      </Helmet>
      <div className='top-yellow-border'>
        <div className='menu-div'>
          <img src={menu_icon} className='menu-icon' alt='Menu' />
        </div>
        <div className='search-div'>
          <span className='search-location'>BITS Pilani Hyderabad Campus</span>
        </div>
      </div>
      <div className='main-body'>
        {Object.entries(groupedItems).map(([outletName, items]) => (
          <div className='parent' key={outletName}>
            <div className='outer'>
              <div className='outlet-name'>
                <span className='Name-text'>{outletName}</span>
                <div className='right-arrow'>
                  <img src={right_arrow_icon} alt='Right Arrow' />
                </div>
              </div>
            </div>
            <div className='menu-items'>
              <div className='outer-container'>
                {items.map((item, itemIndex) => (
                  <div className='container-class' key={itemIndex}>
                    <div className='food-item-card'>
                      <div className='food-item-image' onClick={() => togglePopup(itemIndex)}>
                        <img src={item['food-item-image']} className='food-img' alt='Food Item' />
                      </div>
                      <div className='food-price-div'>
                        <span className='food-price'>Rs. {item.price}</span>
                      </div>
                      <div className='item-details'>
                        <div className='food-item-name'>{item['food-item-name']}</div>
                        <div className='veg-non-veg'>
                          <img src={item.veg ? veg : non_veg} className='dot' alt='Dot' />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isPopupVisible && selectedItemIndex !== null && (
        <Popup
          selectedItemIndex={selectedItemIndex}
          onClose={closePopup}
          menuItems={menuItems}
        />
      )}
    </div>
  );
}
