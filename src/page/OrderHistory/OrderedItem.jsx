import React from "react";
import styled from "styled-components";
import DetailBn01 from "../../images/DetailBn01.jpg";

const OrderedItem = ({ id, name, price, count, orderDate }) => {
  return (
    <>
      <StyledOrderItem>
        <OrderedItemImage>
          <img src={DetailBn01} alt="item-image" />
          {/* <img src={imagePath} alt={`Product ${id}`} /> */}
        </OrderedItemImage>
        <OrderItemName>{name}</OrderItemName>
        <OrderItemDetail>
          <OrderQuantity>수량 {count}</OrderQuantity>
          <TotalPrice>상품금액 {price}</TotalPrice>
        </OrderItemDetail>
      </StyledOrderItem>
    </>
  );
};

export default OrderedItem;

export const StyledOrderItem = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 3rem;
`;

const OrderedItemImage = styled.div`
  width: 15%;
  img {
    width: 100%;
  }
`;

const OrderItemId = styled.h2`
  margin-bottom: 1rem;
`;

const OrderItemName = styled.p`
  margin-bottom: 0.5rem;
`;

const OrderItemDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderDate = styled.h1`
  margin-bottom: 0.5rem;
`;

const OrderQuantity = styled.p`
  margin-bottom: 0.5rem;
`;

const TotalPrice = styled.p`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;
