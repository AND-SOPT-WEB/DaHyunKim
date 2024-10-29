import React from 'react'
import styled from "@emotion/styled";
import { useState } from "react";

const Card = ({name, age}) => {

    const [like, setLike] = useState(0);

    const handleClickButton = () => {
        setLike((prev) => prev + 1);
    }

  return (
    <CardContainer>
        <Name>한국 이름</Name>
        <EngName>영어 이름</EngName>
        <GitID>깃허브 아이디</GitID>
        <LikeContainer>
            <LikeText>{`${like}`}</LikeText>
            <LikeButton onClick={handleClickButton}>Like</LikeButton>
        </LikeContainer>
    </CardContainer>
  ) 
};

export default Card;

const CardContainer = styled.div`
    font-size: 20px;
    border: 1px solid black;
    width: 20rem;
    height: auto;
    border-radius: 0.5rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 0rem 1rem 0rem;
`;

const Name = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;

const EngName = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 500;
`;

const GitID = styled.div`
    font-size: 1rem;
    font-weight: 500;
`;

const LikeContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`;

const LikeText = styled.div`
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
`;

const LikeButton = styled.button`
    width: 3rem;
    height: 2rem;
    background-color: #000;
    font-size: 0.8rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
`;