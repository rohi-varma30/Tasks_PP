import { Skeleton, Card } from "antd";
import React from "react";

const SkeletonSection = () => {
  return (
    <div className="card-container">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          key={index} 
          style={{ height: 400, width: 260, margin: "10px" }}
          cover={
            <div style={{ width: "100%", height: "80px", 
            display: "flex", justifyContent: "center", alignItems: "center"}} >
              <Skeleton.Image style={{ width: 300, height: "100%" }} />   
            </div>
          }
        >  
          <Skeleton  paragraph={{ rows:6 }} />
        </Card>
      ))}
    </div>
  );
};
export default SkeletonSection;
