import React, { useState, useEffect } from 'react';
import { Card,Button } from 'antd';
import SkeletonSection from './Skeleton';
import ProductDetails from '../components/ProductDetsils';

const { Meta } = Card;

const CardSection = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 
  const [isFetching, setIsFetching] = useState(false); 
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchCardData = async (pageNumber) => {
    try {
      const response = await fetch(`https://dummyjson.com/products`);
      const data = await response.json();
      setCardData((prevData) => [...prevData, ...data.products]); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCardData(page);
  }, [page]);

  const handleScroll = () => {
    if (
       window.innerHeight + 
       document.documentElement.scrollTop >=
       document.documentElement.offsetHeight - 100 &&
       !isFetching
    ) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);  
    };
  }, [isFetching]);

  if (loading && page === 1) {
    return <SkeletonSection />;
  }

  if (selectedProductId) {
    return (
      <ProductDetails
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)} 
      />
    );
  }

  return (
    <div className="card-container">
      {cardData.map((product) => (
        <Card
          key={product.id}
          hoverable
          className="card"
          style={{ width: 240 }}
          cover={<img alt={product.title} src={product.thumbnail} />}
        >
          <Meta title={product.title} description={product.description} />
          <Button
            className="button-1"
            onClick={() => setSelectedProductId(product.id)} 
          >
            View Details
          </Button>
        </Card>
      ))}
      {isFetching && <SkeletonSection />}
    </div>
  );
};
export default CardSection;