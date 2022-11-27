import styled, { keyframes } from 'styled-components';

const ImagesLoader = props => {
 
  props.imageSources.forEach((imageSource, index) => {
    const image = new Image();
    image.src = imageSource;
    image.id = `${props.imagesName}-${index}`;
    image.onload = props.imageLoadHandler;
    image.onerror = () => console.log('Image failed to load.')
  });
 
  return (
    <div>
      <LoadingSpinnerWrapper>
        <LoadingSpinnerImage src={props.spinnerImageSource} />
      </LoadingSpinnerWrapper>
    </div>
  );
}


const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;


const LoadingSpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  background-color: #f0e1c8;

  display: flex;
  justify-content: center;
  align-items: center;
`;


const LoadingSpinnerImage = styled.img`
  animation: ${rotate360} 3000ms linear infinite;
`;


export default ImagesLoader;
