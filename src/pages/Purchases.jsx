import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Purchases = () => {

  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    axios
      .get('https://e-commerce-api.academlo.tech/api/v1/purchases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((resp) => setPurchases(resp.data.data.purchases)) //ver con cuidado la respuesta
      .catch((resp) => console.log(resp))
  }, [])
  

  return (
    <div className='content-purchase'>
      <h1>Purchases</h1>
        {
          purchases.map((element, index)=> 
          
          <li key={index}>
            { element.id }
            <ol>
            {
              element.cart.products.map((item, i)=> <li key={i}>{ item.brand }</li>)
            }
            </ol>
          

          </li>)
        }
    </div>
  );
};

export default Purchases;