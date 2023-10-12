import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ListPageFilter from "./ListPageComponent/FilterComponent/ListPageFilter";
import ListPageItem from "./ListPageComponent/ListPageItem";
import "aos/dist/aos.css";
import ListWrap from "./listStyledComponent/ListWrap";
import H3Title from "./listStyledComponent/H3Title";
import axios from "axios";

const PhotoItem = () => {
  const [items, setItems] = useState(null);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("content"); // 초기 필터 설정

  const componentProps = {
    items: items,
    data: data,
    filter: filter,
  };

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져옵니다.
    axios
      .get(
        `http://52.78.184.121:8080/369/product?page=1&sort=${filter}&category=Photography&size=40`
      )
      .then((response) => {
        // API에서 받아온 데이터를 객체에서 배열로 변환
        const data = response.data;
        const PhotographyData = data.content;
        // 변환한 데이터를 상태(state)에 저장
        setItems(PhotographyData);
        console.log("매핑된 데이터", data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      });
  }, [filter]);

  return (
    <ListWrap>
      <H3Title data-aos="fade-up">포토그래피</H3Title>
      <ListPageFilter setFilter={setFilter} defaultFilter={filter} />
      <ListPageItem {...componentProps} />
    </ListWrap>
  );
};

export default PhotoItem;
