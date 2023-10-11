import { useFetchOrderHistoryQuery } from "../../store/orderHistoryApi";
import styled from "styled-components";
import OrderedItem from "./OrderedItem";
// import { Link } from "react-router-dom"; // 상세페이지 구현 시 사용

const OrderHistoryList = () => {
  const { data = [], error, isLoading } = useFetchOrderHistoryQuery();

  let content;

  if (data.length > 0) {
    const sortedData = [...data]
      .sort((a, b) => new Date(a.orderedDate) - new Date(b.orderedDate))
      .reverse();

    content = sortedData.map((order) => (
      <OrderWrapper key={order.orderId}>
        <div>
          {/* <h1> // 상세페이지 링크 연결
            <Link to={`/orders/${order.orderId}`}>
              주문번호: {order.orderId}
            </Link>
          </h1>
          <h1>
            <Link to={`/orders/${order.orderId}`}>
              주문일자: {new Date(order.orderedDate).toLocaleDateString()}
            </Link>
          </h1> */}
          <h1>주문번호: {order.orderId}</h1>
          <h1>주문일자: {new Date(order.orderedDate).toLocaleDateString()}</h1>
        </div>
        {order.orderedProducts.map((product) => (
          <OrderedItem
            key={`${order.orderId}-${product.productId}`}
            id={product.productId}
            name={product.productName}
            price={product.totalOrderedPrice}
            count={product.orderedAmount}
            // imagePath={product.orderedImagePath} // 이미지 경로
          />
        ))}
      </OrderWrapper>
    ));
  } else if (error) {
    content = <div>Error occurred while fetching data</div>;
  }

  return <div>{content}</div>;
};

export default OrderHistoryList;

const OrderWrapper = styled.div`
  border-bottom: 1px solid #cfcdc9;
  margin-bottom: 20px;
`;
