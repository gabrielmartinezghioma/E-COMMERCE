import { Offcanvas, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCartGet } from '../store/slices/cart.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setCart } from '../store/slices/cart.slice'
import { useNavigate } from 'react-router-dom'

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [render, setRender] = useState(false)

    useEffect(() => {
        dispatch(thunkCartGet())
    }, [show])

   const deleteCart = () => {
        cart.map((element) => {
            axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${element.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(() => dispatchGet(setCart([])))
                .catch(error => console.log(error))
        })
    }

    const dispatchGet = useDispatch();

    const navigate = useNavigate()

    const checkout = (purchases) => {
        axios
            .post('https://e-commerce-api.academlo.tech/api/v1/purchases', purchases, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        
            .then(() => navigate('/purchase'))
            .catch(error => console.log(error))

            // el problema esta que checkout elimina todo del carrito y cuando se hace la peticion sale el 404
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    cart.map((element, index) => {
                        return <li key={index}>{element.title}</li>
                    })
                }
                {
                    cart.length !== 0 && <Button onClick={deleteCart}>Delete All</Button>
                }
                {
                    cart.length !== 0 && <Button onClick={() => checkout(cart)}>Checkout</Button>
                }
                {
                    cart.length === 0 && <h2>No hay productos seleccionados</h2>
                }

            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default Cart