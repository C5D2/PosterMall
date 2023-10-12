import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ListPageFilter from "./ListPageComponent/ListPageFilter";
import ListPageItem from "./ListPageComponent/ListPageItem";
import "aos/dist/aos.css";
import ListWrap from "./listStyledComponent/ListWrap";
import H3Title from "./listStyledComponent/H3Title";
import axios from "axios";

const BestItem = () => {
  const [items, setItems] = useState(null);
  const itemsPerPage = 20;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const componentProps = {
    items: items,
    itemsPerPage: itemsPerPage,
    data: data,
    currentPage: currentPage,
  };

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져옵니다.
    axios
      .get("http://localhost:3001/content")
      .then((response) => {
        // API에서 받아온 데이터를 객체에서 배열로 변환
        const data = response.data;
        const testData = Object.values(data);
        // 변환한 데이터를 상태(state)에 저장
        setItems(testData);
        console.log("매핑된 데이터", testData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      });
  }, []);

  return (
    <ListWrap>
      <H3Title data-aos="fade-up">베스트</H3Title>
      <ListPageFilter />
      <ListPageItem {...componentProps} />
    </ListWrap>
  );
};

export default BestItem;
