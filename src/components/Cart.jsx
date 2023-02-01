import {Offcanvas, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCartGet } from '../store/slices/cart.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Cart = ({ show, handleClose })=> {
  
    const dispatch = useDispatch()
    const cart = useSelector(state =>state.cart)
    const [render, setRender] = useState(false)

    useEffect(() => {
      dispatch(thunkCartGet())
    }, [show, render])

    const deleteCart = ()=>{
        cart.map((element)=>{
            axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${element.id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            .then(()=> setRender(!render))
            .catch(error => console.log(error) )
        })
    }
    const checkout = (purchases)=>{
        axios
            .post('https://e-commerce-api.academlo.tech/api/v1/purchases', purchases, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( (response)=> {
            if(response.status === 200){
                setTimeout(()=>{
                    deleteCart()
                },5000)
            }
            console.log(response)
        })
        .catch( error => console.log(error) )
    }

    return(
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {
                cart.map((element, index)=>{
                    return <li key={index}>{ element.title }</li>
                })
            }
            {
                cart.length !== 0 && <Button onClick={ deleteCart }>Delete All</Button>
            }
            {
                cart.length !== 0 && <Button onClick={ ()=> checkout(cart) }>Checkout</Button>
            }
            
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default Cart