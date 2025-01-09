// import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
// import Rating from '../components/Rating';
// import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined } from '@ant-design/icons';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Details = ({ productId, onBack }) => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showInfo, setShowInfo] = useState(false);
//   const [showReview, setShowReview] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const fetchProductDetails = async () => {
//     try {
//       const response = await fetch(`https://dummyjson.com/products/${productId}`);
//       const data = await response.json();
//       setProduct(data);
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cartItems');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//     fetchProductDetails();
//   }, [productId]);

//   useEffect(() => {
//     if (cartItems.length > 0) {
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   const handleAddToCart = () => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//     toast.success(`${product.title} added to cart!`);
//   };

//   const handleRemoveFromCart = (id,name) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//     toast.error(`${name} removed from cart!`);

//   };


  
//   const handleChangeQuantity = (id, type) => {
//     setCartItems(prevItems => 
//       prevItems.map(item => 
//         item.id === id && (type === 'increase' || (type === 'decrease' && item.quantity > 1)) 
//         ? { ...item, quantity: type === 'increase' ? item.quantity + 1 : item.quantity - 1 } 
//         : item
//       )
//     );
//   };

//   const renderReviews = () => {
//     if (!product.reviews || product.reviews.length === 0) {
//       return <p>No reviews available.</p>;
//     }
//     return product.reviews.map((review, index) => (
//       <div key={index} style={{ marginBottom: '10px', paddingBottom: '10px', marginLeft: '1px' }}>
//         <p><strong>Rating:</strong> {review.rating}</p>
//         <p><strong>Comment:</strong> {review.comment}</p>
//         <p><strong>Reviewer:</strong> {review.reviewerName}</p>
//         <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
//       </div>
//     ));
//   }; 

//   const renderCartItems = () => {
//     return cartItems.map(item => (
//       <div key={item.id} className='items'>
//         <div className='flex'>
//           <img src={item.thumbnail} alt={item.title} style={{ height: '3rem', width: '3rem' }} />
//           <h5 className='new'>{item.title}</h5>
//         </div>
//         <div className='flex'>
//           <span style={{ margin: '0 10px' }}>{item.quantity}</span>
//           <div className='flex flex-direction'>
//             <CaretUpOutlined 
//               onClick={() => handleChangeQuantity(item.id, 'increase')}
//             />
//             <CaretDownOutlined 
//               onClick={() => handleChangeQuantity(item.id, 'decrease')} 
//             />
//           </div>
//         </div>
//         <h5 className=''>$ {(item.price * item.quantity).toFixed(2)}</h5>
//         <Button 
//           icon={<DeleteOutlined />} 
//           onClick={() =>
//             handleRemoveFromCart(item.id, item.title)} 
//           style={{ border: 'none' }} 
//         />
//       </div>
//     ));
//   };

//   if (loading) {
//     return <p>Loading Card Details...</p>;
//   }

//   if (!product) {
//     return <p>No product details found.</p>;
//   }
          

//   return (
//     <div style={{ padding: '20px', height: '70vh', overflow: 'hidden' }}>
//       <Button onClick={onBack} style={{ marginBottom: '10px' }}>
//         Back to Products  
//       </Button>
//       <div style={{ display: 'flex', gap: '30px' }}>
//         <div>
//           <img
//             src={product.thumbnail}
//             alt={product.title}    
//             style={{
//               width: '500px', height: '500px', objectFit: 'cover',
//               borderRadius: '8px', backgroundColor: 'grey', marginTop: '10px'
//             }}
//           />
//         </div>
//         <div className="product-details">
//           <h1 style={{marginTop:'0rem'}}>{product.title}</h1>
//           <Rating ratingValue={product.rating} />
//           <p>{product.description}</p>
//           <Button className='btn-2' type='button' onClick={() => setShowInfo(!showInfo)}>
//             {showInfo ? 'Hide Info' : 'Show Info'}
//           </Button>
//           <Button className='btn-2' type="button" onClick={() => setShowReview(!showReview)}>
//             {showReview ? 'Hide Reviews' : 'Show Reviews'}
//           </Button>

//           {showInfo && (
//             <div>
//               <p><strong>Stock:</strong> {product.stock}</p>
//               <p><strong>Brand:</strong> {product.brand}</p>
//               <p><strong>Category:</strong> {product.category}</p>
//               <p><strong>Discount Percentage:</strong> {product.discountPercentage}</p>
//               <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
//               <p><strong>Sku:</strong> {product.sku}</p>
//               <p><strong>Weight:</strong> {product.weight} kg</p>
//               <p><strong>Dimensions:</strong> {`Width: ${product.dimensions.width}cm, 
//               Height: ${product.dimensions.height}cm, Depth: ${product.dimensions.depth}cm`}</p>
//               <p><strong>Warranty Information:</strong> {product.warrantyInformation}</p>
//               <p><strong>Shipping Information:</strong> {product.shippingInformation}</p>
//               <p><strong>Availability Status:</strong> {product.availabilityStatus}</p>
//               <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
//               <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>
//               <p><strong>Barcode:</strong> {product.meta?.barcode}</p>
//             </div>
//           )}
//           {showReview && (
//             <div>
//               <h2 style={{ marginLeft: '1px' }}>Reviews</h2>
//               {renderReviews()}
//             </div>
//           )}
//           <div className='flex'>
//             <div style={{alignItems:'flex-start'}}>
//               <p className='rating-price'>$ {product.price}</p>
//               <Button className='btn' onClick={handleAddToCart}>
//                 Add to Cart
//               </Button>
//             </div>
//             {cartItems.length > 0 && (
//               <div >
//                 <p className='cart-title'>Shopping Cart</p>
//                 <h5 className='cart-title-1'>You have {cartItems.length} items in your cart</h5>
//                 <div className='cart-container'>
//                   {renderCartItems()}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ToastContainer
//         position="top-center" autoClose={5000}
//         hideProgressBar={false}  newestOnTop={false}
//         closeOnClick  rtl={false}
//         pauseOnFocusLoss  draggable  pauseOnHover
//       />
//     </div>
//   );
// };
// export default Details;

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Rating from '../components/Rating';
import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QRCodeCanvas} from 'qrcode.react'; 

const Details = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showUPIScanner, setShowUPIScanner] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleAddToCart = () => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} added to cart!`);
    setShowPaymentOptions(true); // Show payment options after adding to cart
  };

  const handleRemoveFromCart = (id, name) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.error(`${name} removed from cart!`);
  };

  const handleChangeQuantity = (id, type) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && (type === 'increase' || (type === 'decrease' && item.quantity > 1))
          ? { ...item, quantity: type === 'increase' ? item.quantity + 1 : item.quantity - 1 }
          : item
      )
    );
  };

  const handleUPIPayment = () => {
    setShowUPIScanner(true); // Show UPI scanner
  };

  const handleMockPaymentConfirmation = () => {
    setIsProcessingPayment(true);
    toast.info(`Processing UPI payment...`);

    // Simulate payment processing delay
    setTimeout(() => {
      toast.success(`UPI Payment successful!`);
      setCartItems([]); // Clear cart on successful payment
      localStorage.removeItem('cartItems');
      setIsProcessingPayment(false);
      setShowUPIScanner(false);
    }, 3000); // Simulate 3-second delay for payment processing
  };

  const renderReviews = () => {
    if (!product.reviews || product.reviews.length === 0) {
      return <p>No reviews available.</p>;
    }
    return product.reviews.map((review, index) => (
      <div key={index} style={{ marginBottom: '10px', paddingBottom: '10px', marginLeft: '1px' }}>
        <p><strong>Rating:</strong> {review.rating}</p>
        <p><strong>Comment:</strong> {review.comment}</p>
        <p><strong>Reviewer:</strong> {review.reviewerName}</p>
        <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
      </div>
    ));
  };

  const renderCartItems = () => {
    return cartItems.map(item => (
      <div key={item.id} className='items'>
        <div className='flex'>
          <img src={item.thumbnail} alt={item.title} style={{ height: '3rem', width: '3rem' }} />
          <h5 className='new'>{item.title}</h5>
        </div>
        <div className='flex'>
          <span style={{ margin: '0 10px' }}>{item.quantity}</span>
          <div className='flex flex-direction'>
            <CaretUpOutlined
              onClick={() => handleChangeQuantity(item.id, 'increase')}
            />
            <CaretDownOutlined
              onClick={() => handleChangeQuantity(item.id, 'decrease')}
            />
          </div>
        </div>
        <h5 className=''>$ {(item.price * item.quantity).toFixed(2)}</h5>
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveFromCart(item.id, item.title)}
          style={{ border: 'none' }}
        />
      </div>
    ));
  };

  if (loading) {
    return <p>Loading Card Details...</p>;
  }

  if (!product) {
    return <p>No product details found.</p>;
  }

  return (
    <div style={{ padding: '20px', height: '70vh', overflow: 'hidden' }}>
      <Button onClick={onBack} style={{ marginBottom: '10px' }}>
        Back to Products
      </Button>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: '500px', height: '500px', objectFit: 'cover',
              borderRadius: '8px', backgroundColor: 'grey', marginTop: '10px'
            }}
          />
        </div>
        <div className="product-details">
          <h1 style={{ marginTop: '0rem' }}>{product.title}</h1>
          <Rating ratingValue={product.rating} />
          <p>{product.description}</p>
          <Button className='btn-2' type='button' onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? 'Hide Info' : 'Show Info'}
          </Button>
          <Button className='btn-2' type="button" onClick={() => setShowReview(!showReview)}>
            {showReview ? 'Hide Reviews' : 'Show Reviews'}
          </Button>

          {showInfo && (
            <div>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Discount Percentage:</strong> {product.discountPercentage}</p>
              <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
              <p><strong>Sku:</strong> {product.sku}</p>
              <p><strong>Weight:</strong> {product.weight} kg</p>
              <p><strong>Dimensions:</strong> {`Width: ${product.dimensions.width}cm, 
              Height: ${product.dimensions.height}cm, Depth: ${product.dimensions.depth}cm`}</p>
              <p><strong>Warranty Information:</strong> {product.warrantyInformation}</p>
              <p><strong>Shipping Information:</strong> {product.shippingInformation}</p>
              <p><strong>Availability Status:</strong> {product.availabilityStatus}</p>
              <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
              <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>
              <p><strong>Barcode:</strong> {product.meta?.barcode}</p>
            </div>
          )}
          {showReview && (
            <div>
              <h2 style={{ marginLeft: '1px' }}>Reviews</h2>
              {renderReviews()}
            </div>
          )}
          <div className='flex'>
            <div style={{ alignItems: 'flex-start' }}>
              <p className='rating-price'>$ {product.price}</p>
              <Button className='btn' onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
            {cartItems.length > 0 && (
              <div>
                <p className='cart-title'>Shopping Cart</p>
                <h5 className='cart-title-1'>You have {cartItems.length} items in your cart</h5>
                <div className='cart-container'>
                  {renderCartItems()}
                </div>
              </div>
            )}
          </div>
          {showPaymentOptions && (
            <div>
              <h3>Select Payment Method:</h3>
              <Button onClick={handleUPIPayment} disabled={isProcessingPayment}>Pay with UPI</Button>
  
            </div>
          )}
          {showUPIScanner && (
            <div style={{ marginTop: '20px' }}>
              <h3>Scan this QR Code to Pay:</h3>
              <QRCodeCanvas
                value={`upi://pay?pa=6300394687@ybl&pn=VETUKURIROHITHVARMA&mc=1234&tid=1234567890&tr=ORDER123&tn=Payment for your order&am=${product.price}&cu=INR`}
                size={256}
              />
              <Button style={{ marginTop: '10px' }} onClick={handleMockPaymentConfirmation} disabled={isProcessingPayment}>
                Confirm Payment
              </Button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center" autoClose={5000}
        hideProgressBar={false} newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover
      />
    </div>
  );
};

export default Details;
