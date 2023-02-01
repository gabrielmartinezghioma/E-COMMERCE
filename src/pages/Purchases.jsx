import React from 'react';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';



const Purchases = () => {

  const dispatch = useDispatch()

  const [purchases, setPurchases] = useState([])

  useEffect(() => {

    dispatch(setIsLoading(true))

    axios
      .get('https://e-commerce-api.academlo.tech/api/v1/purchases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((resp) =>{
        console.log(resp.data.data.purchases)
        setPurchases(resp.data.data.purchases)}) //ver con cuidado la respuesta
      .catch((resp) => console.log(resp))
      .finally(() => dispatch(setIsLoading(false)))
  }, [])
  

  return (
    <div className='content-purchase'
    >
      <section className='section-name-purchase'>
        <Link  to={"/"}
        style= {{
          textDecoration:"none"
        }}> 
        <h4>Home</h4> </Link>
        <div style={{
          background: "var(--secondary--color)",
          borderRadius: "50%",
          height: "6px",
          margin: "  14px",
          width: "6px"
        }}
        ></div>
        <h4>Purchases</h4>
      </section>
      <div>

        <h3 className='my-purchase'>My Purchase</h3>

      </div>

        {

          purchases.map((element, index)=> 
          
          <li key={index}>
            <ul className='ul-purchase'>
            {
              element.cart.products.map((item, i)=>
               <li key={i} className='li-purchase'>
                <div className='content-detail-purchase'>

                  <h2>{item.updatedAt}</h2>
                  <h3>
                  { item.brand }
                  </h3>
                  <h3>{item.price}</h3>

                </div>
               
                
                </li>)
            }
            </ul>
          

          </li>)
        }
    </div>
  );
};

export default Purchases;