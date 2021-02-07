import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails,productUpdateByAdmin} from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({match,history}) => {

    const productId = match.params.id

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [description,setDescription] = useState(0)
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState(0)
    const [countInStock,setCountInStock] = useState(0)
    const [rating,setRating] = useState(0)
    const [numReviews,setNumReviews] = useState(0)
    const [uploading,setUploading] = useState(false)


   
    const dispatch = useDispatch()

    const productDetail = useSelector( state => state.productDetail)
    const {loading,error,product} = productDetail

    const productUpdate = useSelector( state => state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({
                type:PRODUCT_UPDATE_RESET
            })
            history.push('/admin/productlist')
        } else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setDescription(product.description)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setRating(product.rating)
                setNumReviews(product.numReviews)
            }
             
        }       
            
    },[dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }
    

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(productUpdateByAdmin({
            _id: productId,
            name,
            price,
            image,
            description,
            brand,
            category,
            countInStock,
            rating,
            numReviews
        }))
          
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter product name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>
                            Image
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e)=> setImage(e.target.value)}></Form.Control>
                        <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                        {uploading && <Loader />}
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control type='number' placeholder='Enter product price' value={price} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>
                            Discription
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter product description' value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label>
                            Brand
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter product brand' value={brand} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter product category' value={category} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label>
                            Count In Stock
                        </Form.Label>
                        <Form.Control type='number' placeholder='Enter product stock' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='rating'>
                        <Form.Label>
                            Rating
                        </Form.Label>
                        <Form.Control type='number' placeholder='Enter product rating' value={rating} onChange={(e)=> setRating(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='numReviews'>
                        <Form.Label>
                            Number Of Reviews
                        </Form.Label>
                        <Form.Control type='number' placeholder='Enter number of reviews' value={numReviews} onChange={(e)=> setNumReviews(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                )}  
            </FormContainer>
        </>
        
    )
}

export default ProductEditScreen
