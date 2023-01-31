import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterCategoriesThunk, getFilterProducts, getFilterPrice } from '../store/slices/products.slice';
import {Row, Col, Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useForm } from "react-hook-form";

const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const [categorie, setCategorie] =useState([])
    const { handleSubmit, register } = useForm();
      
    useEffect(() => {

      axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then(resp => setCategorie(resp.data.data.categories))
      .catch (error => console.log(error))
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false))
        }, 1500)
      })
      dispatch(getProductsThunk())
      
    },[])
    const searchProduct = (e) => {
        dispatch(getFilterProducts(e))
    }
    const submit = (data) => {
      dispatch(getFilterPrice(data))  
    }
  
  return (
    <div className='content-home'>
      <h1>Home</h1>
{/* Search */}
      <Col className="navbar navbar-light border-0">
          <Form className="d-flex" 
          onSubmit={ (e) => searchProduct(e.target[0].value)}>
            <Form.Control
              onChange={(e) => searchProduct(e.target.value)}
              type="search"
              placeholder="What are you looking for?"
              className="me-2"
              aria-label="Search"
              style={{heigth: '40px', width: '60vw'}}
            />       
          </Form>
      </Col>

      <Row xs={2} md={3} lg={4}>

      <Col className='filters d-block p-5' >
        <div className='h-50'>
        {/* Dezpliegue de los precios */}
      <Accordion defaultActiveKey="0" >
        <Accordion.Item eventKey="0" className='border-0'>
          <Accordion.Header className='w-auto shadow mb-1 bg-white text-dark border-bottom-dark rounded'  variant="success" id="dropdown-basic" style={{ width: '200px'}}>Price</Accordion.Header>
          <Accordion.Body className='w-auto' show = 'onToggle' style={{ width: '200px'}}>
            <Form onSubmit={ handleSubmit(submit) } >
                <Form.Group className="mb-3" controlId="formBasicPriceOne">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="number" {...register("priceOne")} placeholder="1000$" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPriceTwo">
                  <Form.Label>To</Form.Label>
                  <Form.Control type="number" {...register("priceTwo")}placeholder="2000$" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Filter Price
                </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div> 
{/* Dezpliegue de las categorias */}
      <div className='h-50'>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className='border-0'>
          <Accordion.Header className='w-auto shadow mb-1 bg-white text-dark border-bottom-dark rounded'  variant="success" id="dropdown-basic" style={{ width: '200px'}}>Category</Accordion.Header>
          <Accordion.Body className='w-auto' show = 'onToggle' style={{ width: '200px'}}>
          {categorie.map((category, index) => (
          <Col key={index}>
          <Button
            variant="ligth"
            onClick={() => dispatch(filterCategoriesThunk(category.id))}>
            {category.name}
          </Button>
          </Col>
        ))}
        <Button 
            variant="ligth" 
            onClick={() => dispatch(getProductsThunk())}>All Products
        </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> 
      </div>
      </Col>
{/* Listado completo de los productos */}

  {
    products.map((product, index) => (
      <Col className='product d-flex' key={index} as={ Link } to = {`/products/${product.id}`}>
        <Card className='Card' style={{height: '500px', width:'280px'}}>
          <div className='homeImage'>
            <Card.Img className='over'          
            variant="top"
            // Imagen 1
            src={product.productImgs[0]} />
            <Card.Img  
            className='over1'          
            variant="top"
            // Imagen 2
            src={product.productImgs[1]} />
          </div>   
          <Card.Body>
            <div className='description'>
              <Card.Text className='categorie'>{product.category.name}</Card.Text>
              <Card.Title className='title'>{product.title}</Card.Title>
              <Card.Text className='price'> <span>Price: </span> </Card.Text>
              <Card.Text className='amount'>{product.price}</Card.Text>
            </div> 
            <Link to={'/purchase'} ><Button className='btn-shopping' variant="primary">
                  <i className="fa-solid fa-cart-shopping"></i>
            </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    ))
  } 
  
      </Row>
    </div>
  )
}

export default Home;