import React, { useEffect, useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import styled from "styled-components";
import { COLUMNS } from "./columns";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ProductTable = () => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/product-modification/${id}`);
  };

  // columns 배열 중 일부 수정(id값으로 받아오기)
  const columns = useMemo(
    () => [
      COLUMNS[0], // 첫 번째 열을 가져오고 두 번째 열에 이미지 미리보기를 넣음
      {
        Header: "이미지",
        accessor: "productImages",
        Cell: ({ value }) => (
          <div>
            {value.map((imgStr, index) => {
              /** match(/imagePath=(.*),/)[1]은 imagePath=와 , 사이에 있는 부분을 추출 */
              const imagePath = imgStr.match(/imagePath=(.*),/)[1];
              return (
                <img
                  key={index}
                  src={imagePath}
                  alt="Product Preview"
                  style={{ width: "50px", height: "50px" }}
                />
              );
            })}
          </div>
        ),
      },
      ...COLUMNS.slice(1), // 첫 번째 요소를 제외한 나머지 모든 요소를 새배열로 생성
      {
        id: "edit",
        accessor: "id",
        Cell: ({ row }) => (
          <TableButton onClick={() => handleEdit(row.original.id)}>
            수정
          </TableButton>
        ),
      },
    ],
    []
  );

  // 훅 만들어야 하는데 자꾸 오류나서 일단 여기에 넣음
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://52.78.184.121:8080/369/admin/"
        );
        const data = response.data;
        // data가 이미 배열인 경우 그대로 사용하고, 그렇지 않은 경우 빈 배열로 설정
        const arrayData = Object.values(data);

        setData(arrayData);
        console.log("매핑된 데이터", data);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    }
    fetchData();
  }, []);

  // data가 없는 경우 예외 처리
  if (!data) {
    return <div>Loading...</div>;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    gotoPage,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    usePagination
  );

  // 페이지네이션 버튼 범위 관리 상태
  const [pageRangeStartIndex, setPageRangeStartIndex] = useState(0);

  // 다음 or 이전 페이지 그룹(5페이지씩)으로 이동하는 함수
  function movePageGroup(dir) {
    if (dir === "prev" && pageRangeStartIndex >= 5) {
      setPageRangeStartIndex(pageRangeStartIndex - 5);
    } else if (dir === "next" && pageRangeStartIndex < pageCount - 5) {
      setPageRangeStartIndex(pageRangeStartIndex + 5);
    }
  }

  return (
    <ProductTableStyle>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      <div className="pagination">
        {/* 이전 페이지 그룹 버튼 */}
        <TableButton
          onClick={() => movePageGroup("prev")}
          disabled={pageRangeStartIndex === 0}
        >
          {"<"}
        </TableButton>

        {/* 페이징 숫자 목록, 최대 5개의 페이지 번호 생성, 마지막 페이지 그룹에서는 남은 페이지 수만큼만 버튼 생성 */}
        {[...Array(Math.min(5, pageCount - pageRangeStartIndex))].map(
          (_, i) => (
            <TableButton
              key={i}
              onClick={() => gotoPage(pageRangeStartIndex + i)}
            >
              {pageRangeStartIndex + i + 1}
            </TableButton>
          )
        )}

        {/* 다음 페이지 그룹 버튼 */}
        <TableButton
          onClick={() => movePageGroup("next")}
          disabled={pageRangeStartIndex >= pageCount - 5}
        >
          {">"}
        </TableButton>
      </div>
    </ProductTableStyle>
  );
};

const ProductTableStyle = styled.div`
  padding: 50px 0 50px 0;
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: rgba(51, 51, 51, 0.5);
  }
  th {
    background-color: #02c75a;
    color: white;
    text-align: center;
  }
`;

const TableButton = styled.button`
  background: #919191;
  color: #fff;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
`;
