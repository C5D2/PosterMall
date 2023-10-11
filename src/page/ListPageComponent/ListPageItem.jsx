import React from "react";
import "aos/dist/aos.css";
import ListItemExpensive from "./ListItemExpensive";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ListFlex from "../listStyledComponent/ListFlex";

const ListPageItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져옵니다.
    axios
      .get("https://shoppingmall-9c992-default-rtdb.firebaseio.com/items.json")
      .then((response) => {
        // API에서 받아온 데이터 확인
        console.log("응답 데이터:", response.data);

        // 필요한 값만 추출하여 배열로 변환
        const extractedData = Object.values(response.data);

        // 변환한 데이터를 상태(state)에 저장
        setItems(extractedData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      });
  }, []);

  return (
    <ListFlex>
      {items.map((item, key) => (
        <ListItemExpensive key={key} item={item} />
      ))}
    </ListFlex>
  );
};

export default ListPageItem;
