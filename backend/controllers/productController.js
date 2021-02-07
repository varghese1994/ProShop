const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


//@desc fetch all products
//@route GET api/products
//@access public

const getProducts = asyncHandler( async(req,res) =>{
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'

        }
    }:{}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json({products, page,pages:Math.ceil(count/pageSize)})
})

//@desc fetch single product
//@route GET api/products/:id
//@access public

const getProductById = asyncHandler( async(req,res)=>{

    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw Error('Product not found!!!')
    }
})

//@desc delete product admin only
//@route DELETE /api/products/:id
//@access private

const deleteProductById = asyncHandler( async(req,res)=>{

    const product = await Product.findById(req.params.id)

    if(product){
        product.remove()
        res.json({message:'Product deleted successfully!'})
    }else{
        res.status(404)
        throw Error('Product not found!!!')
    }
})

//@desc create product admin only
//@route POST /api/products
//@access private

const createProduct = asyncHandler( async(req,res)=>{

    const product = new Product({
        name: 'sample product',
        image: '/images/sample.jpg',
        user: req.user._id,
        description:'sample discription',
        brand: 'sample brand',
        category: 'sample category',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc update product admin only
//@route PUT /api/products/:id
//@access private

const updateProduct = asyncHandler( async(req,res)=>{
    const {
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock,
        rating,
        numReviews
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.image = image
        product.description = description
        product.brand = brand
        product.category = category
        product.price = price
        product.countInStock = countInStock
        product.rating = rating
        product.numReviews = numReviews

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found!')
    }
})

//@desc create product review
//@route POST /api/products/:id/reviews
//@access private

const createProductReview = asyncHandler( async(req,res)=>{
    const {
       rating,
       comment
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if(alreadyReviewed){
        res.status(400)
        throw new Error('Product already reviewed!')
    }
    
    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc,item)=> item.rating + acc,0)/product.reviews.length
    console.log(product.rating)
    await product.save()

    res.status(201).json({
        message:'Review added!'
    })
    }else{
        res.status(404)
        throw new Error('Product not found!')
    }
})

//@desc get top rated products
//@route GET /api/products/top
//@access public

const getTopProducts = asyncHandler( async(req,res)=>{
    const product = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(product) 
})

module.exports = {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}