import React from "react";
import OrderHistoryList from "./OrderHistoryList";
import styled from "styled-components";

const OrderHistory = () => {
  return (
    <>
      <ListWrap>
        <div className="wrapper">
          <H3Title>주문내역</H3Title>
        </div>
      </ListWrap>
      <OrderHistoryList />
    </>
  );
};

export default OrderHistory;

const ListWrap = styled.div`
  padding: 200px 0 0 0;
  width: 1600px;
  margin: 0 auto;
`;

const H3Title = styled.div`
  font-family: "BMHANNAPro";
  font-size: 40px;
  text-align: center;
  padding: 50px 0 50px 0;
  box-sizing: border-box;
  border-top: solid 2px #333;
  border-bottom: solid 2px #333;
  margin-bottom: 30px;
`;
