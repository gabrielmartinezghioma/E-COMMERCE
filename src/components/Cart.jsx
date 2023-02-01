import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCartGet } from '../store/slices/cart.slice'
import { useEffect } from 'react'

const Cart = ({ show, handleClose })=> {
  
    const dispatch = useDispatch()

    const cart = useSelector(state =>state.cart)
    console.log(cart)

    useEffect(() => {
      dispatch(thunkCartGet())
    }, [])

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
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default Cart