import styled from "styled-components";

const BnList = styled.div`
  padding: 0 0 0 20px;
  box-sizing: border-box;

  @media all and (max-width: 1000px) {
    height: 250px;
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  @media all and (max-width: 1000px) {
    img {
      height: 100%;
    }
  }
`;

export default BnList;
