import {Offcanvas, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCartGet } from '../store/slices/cart.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Cart = ({ show, handleClose })=> {
  
    const dispatch = useDispatch()
    const cart = useSelector(state =>state.cart)
    const [render, setRender] = useState(false)
    let total = 0
    const arrayTotal = []

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
            console.log(response)
        })
        .catch( error => console.log(error) )
    }
    const totalShopping = cart?.price?.map((productPrice, index)=>
    {    
        total += parseInt(productPrice)  
        
    })
    
    
    
    return(
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                {/* Cada producto seleccionado */}
            
                <Card className='articleSelect' style={{height: '500px', width:'280px'}}>
                  {  
                    cart.map((element, index)=>{                
                    return (
                        <Card.Body key={index}>
                        <div className='articles'>
                            <Card.Title className='title'>{element.title}</Card.Title>
                            <button><i className="fa-solid fa-trash"></i></button>
                        </div>
                        <div>
                            <Card.Text> <span>Total:</span> {element.price}</Card.Text>
                        </div>
                        </Card.Body>         
                    )
                    })
                  }
                  <Card.Footer>
                {/* total de todos los productos */}
                <div>
                    <Card.Title>Total:</Card.Title>
                    <Card.Text> {totalShopping} </Card.Text>

                </div>
            
            {/* {
                cart.length !== 0 && <Button onClick={ deleteCart }>Delete All</Button>
            } */}
            {
                cart.length !== 0 && <Button onClick={ ()=> checkout(cart) }>Checkout</Button>
            }
                    </Card.Footer>
            </Card>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default Cart