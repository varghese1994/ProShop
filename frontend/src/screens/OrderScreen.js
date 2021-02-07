import React,{useState,useEffect} from 'react'
import {Row,Col,ListGroup,Image,Card,Button} from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {getOrderDetail,payOrder,deliverOrderByAdmin} from '../actions/orderAction'
import axios from 'axios'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({match, history}) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails )
    const { order, loading, error } = orderDetails

    const userLogin = useSelector((state) => state.userLogin )
    const { userInfo } = userLogin

    const orderPay = useSelector((state) => state.orderPay )
    const {  loading:loadingPay, success:successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver )
    const {  loading:loadingDeliver, success:successDeliver } = orderDeliver
    
    const [sdkReady, setSdkReady] = useState(false)
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        const addPaypalScript = async () =>{
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetail(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
        
    },[orderId,dispatch,successPay,successDeliver,order,history,userInfo])    

    const successPaymentHandler = (paymentResult) =>{
        
        dispatch(payOrder(orderId,paymentResult))
    }

    const successDeliverHandler = () =>{
        dispatch(deliverOrderByAdmin(order))
    }
      
    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Order {order._id} </h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong>{order.user.name}</p>
                        <p><strong>Email:</strong><Link to={`mail to ${order.user.email}`}>{order.user.email}</Link></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                        ):(
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                        </p>
                        {!order.isPaid ? (
                            <Message variant='danger'>Not paid</Message>
                        ):(
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (<Message>Order is empty</Message>):(
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X {item.price} = {item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/> : (
                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                            )}
                        </ListGroup.Item>
                    )}
                    {loadingDeliver && <Loader/>}
                    {
                        userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={successDeliverHandler}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen