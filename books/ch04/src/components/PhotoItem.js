import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setBgColor, showModal } from '../redux/imageModal';
import LazyLoad from 'react-lazyload';
import { getAverageColorOfImage } from '../utils/getAverageColorOfImage';

function PhotoItem({ photo: { urls, alt } }) {
  const dispatch = useDispatch();

  const openModal = (e) => {
    dispatch(showModal({ src: urls.full, alt }));

    // 썸네일 이미지로 배경색 계산 후, 리덕스에 저장
    const averageColor = getAverageColorOfImage(e.target);
    dispatch(setBgColor(averageColor));
  };

  return (
    <ImageWrap>
      <LazyLoad offset={1000}>
        <Image
          src={urls.small + '&t=' + new Date().getTime()}
          alt={alt}
          onClick={openModal}
          crossOrigin="*"
        />
      </LazyLoad>
    </ImageWrap>
  );
}

const ImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export default PhotoItem;
