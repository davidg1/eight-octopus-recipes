import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SizeMe } from 'react-sizeme';

import Modal from '../common/Modal';
import VideoPlayer from '../common/VideoPlayer';

import tubeTV from '../assets/images/tube-tv.jpg';
import popcorn from '../assets/images/popcorn.png';
import popcornInLeftHand from '../assets/images/popcorn-in-left-hand.png';
import remote from '../assets/images/remote.png';
import remoteInRightHand from '../assets/images/remote-in-right-hand.png';
import table from '../assets/images/table.jpg';
import manWatchingTV from '../assets/images/man-watching-tv.png';
import inspirationArrow from '../assets/images/inspiration-arrow.png';
import inspirationArrowVertical from '../assets/images/inspiration-arrow-vertical.png';
import inspirationNoArrow from '../assets/images/inspiration-no-arrow.png';
import videoPoster from '../assets/images/video-poster.jpg';
import inspirationVideo from '../assets/videos/inspiration-video-2000cbr.mp4';


const gradientDarkColor = '#0e0f17';
const gradientLightColor = '#555987';


const Inspiration = props => {
  
  const [isDelayCompleted, setIsDelayCompleted] = useState(false);
  const [isTelevisionOn, setIsTelevisionOn] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsDelayCompleted(true), 1200);
  }, []);

  const videoSources = [{
    id: 1,
    src: inspirationVideo,
    type: 'video/mp4'
  }];

  const handleRemotePowerClick = () => setIsTelevisionOn(!isTelevisionOn);

  return (
    <InspirationWrapper>
      <VideoWrapper televisionOn={isTelevisionOn}>
        <VideoPlayer
          sources={videoSources}
          controls
          poster={videoPoster}
          width="100%"
        />
      <PopcornImage src={popcorn} alt="popcorn" />
        <RemoteImage src={remote} alt="remote" />
        <RemotePowerButtonOverlay onClick={handleRemotePowerClick} />
        <TableImage src={table} alt="table" />
      </VideoWrapper>

      <SizeMe monitorHeight refreshMode={'throttle'} refreshRate={150}>
        {props =>  <TelevisionViewer size={props.size} />}
      </SizeMe>

      <Modal
        modalName="inspiration-modal"
        show={!props.modalShown && isDelayCompleted}
        buttonClickHandler={props.buttonClickHandler}
        overlayBackgroundColor={'rgba(16, 65, 81, .96)'}
        contentBackgroundColor={'transparent'}
      >
        <InspirationModalContent>
          <InspirationModalImage src={tubeTV} alt="tube television" />
          <InspirationModalText>
            <InspirationModalParagraph>
              This React application was inspired by the "Terms of Service" episode of
              the fourth season of HBO's Emmy-nominated Silicon Valley comedy series.
            </InspirationModalParagraph>
            <InspirationModalParagraph>
              The following short video clip originally contained three uses of profanity
              which have been <span>edited</span> out both audibly and visually making it safe for
              office viewing.
            </InspirationModalParagraph>
          </InspirationModalText>
        </InspirationModalContent>
      </Modal>
    </InspirationWrapper>
  );
}


const InspirationWrapper = styled.div`
  background-color: black;
  background-image: linear-gradient(${gradientDarkColor}, ${gradientLightColor});
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 849px) {
    &::after {
      content: "";
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #85A4D0;
      background-image: linear-gradient(${gradientDarkColor}, ${gradientLightColor});
    }
  }
`;


const VideoWrapper = styled.div`
  background-color: black;
  width: 715px;
  border-radius: 12px;
  padding: 14px 16px 19px;
  margin-top: 98px;

  position: relative;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    right:  ${({ televisionOn }) => televisionOn ? '50px' : '14px'};
    bottom: ${({ televisionOn }) => televisionOn ? '9px' : '18px'};
    top: ${({ televisionOn }) => televisionOn ? 'auto' : '12px'};
    left: ${({ televisionOn }) => televisionOn ? 'auto' : '14px'};

    background-color: ${({ televisionOn }) => televisionOn ? 'lime' : '#0f0f0f'};
    width: ${({ televisionOn }) => televisionOn ? '5px' : 'auto'};
    height: ${({ televisionOn }) => televisionOn ? '5px' : 'auto'};
    border-radius: ${({ televisionOn }) => televisionOn ? '50%' : '3px'};
  }

  &::before {
    content: "";
    position: absolute;
    top: -60px;
    left:  -235px;
    background-image: url(${inspirationArrow});
    background-size: contain;
    background-repeat: no-repeat;
    width: 260px;
    height: 260px;
  }

  @media (max-width: 1229px) {
    margin-left: 15%;
  }

  @media (max-width: 1069px) {
    width: 625px;

    &::before {
      width: 234px;
      left: -205px;
      top: -50px;
    }
  }

  @media (max-width: 949px) {
    margin-left: 20%;

    &::before {
      background-image: url(${inspirationArrowVertical});
      top: 90px;
      left: -180px;
      width: 160px;
    }
  }

  @media (max-width: 849px) {
    width: 95%;
    margin-top: 140px;
    margin-left: 0;

    &::after {
      content: "";
      position: absolute;
      top: auto;
      right:  50px;
      bottom: 9px;
      left: auto;
      width: 5px;
      height: 5px;
      border-radius: 50%
    }

    &::before {
      background-image: url(${inspirationNoArrow});
      top: -45px;
      left: 50%;
      width: 300px;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 519px) {
    width: 97%;
    border-radius: 8px;
    padding: 4px 4px 9px;
    margin-top: 120px;

    &::after {
      width: 3px;
      height: 3px;
      right:  30px;
      bottom: 5px;
    }
  }
`;


const PopcornImage = styled.img`
  position: fixed;
  bottom: 0;
  left: 55px;
  z-index: 20;

  transform-origin: left bottom;

  @media (max-height: 554px), (max-width: 849px) {
    display: none;
  }

  @media (min-width: 1070px) and (max-height: 764px) {
    transform: scale(.8);
  }

  @media (min-width: 1070px) and (max-height: 714px) {
    transform: scale(.7);
  }

  @media (min-width: 1070px) and (max-height: 689px) {
    transform: scale(.6);
  }

  @media (min-width: 1070px) and (max-height: 659px) {
    transform: scale(.5);
  }

  @media (min-width: 1070px) and (max-height: 629px) {
    display: none;
  }

  @media (max-width: 1069px) and (max-height: 729px) {

    transform: scale(.9);
  }

  @media (max-width: 1069px) and (max-height: 699px) {
    transform: scale(.8);
  }

  @media (max-width: 1069px) and (max-height: 669px) {
    transform: scale(.7);
  }

  @media (max-width: 1069px) and (max-height: 645px) {
    transform: scale(.6);
  }

  @media (max-width: 1069px) and (max-height: 624px) {
    transform: scale(.5);
  }

  @media (max-width: 1069px) and (max-height: 599px) {
    bottom: -5px;
    left: 45px;
  }
`;


const RemoteImage = styled.img`
  position: fixed;
  right: 0;
  bottom: -59px;
  z-index: 30;

  transform-origin: right bottom;

  @media (max-height: 554px), (max-width: 849px) {
    display: none;
  }

  @media (min-width: 1070px) and (max-height: 764px) {
    transform: scale(.8);
    bottom: -50px;
  }

  @media (min-width: 1070px) and (max-height: 714px) {
    transform: scale(.7);
    bottom: -45px;
  }

  @media (min-width: 1070px) and (max-height: 689px) {
    transform: scale(.6);
    bottom: -43px;
  }

  @media (min-width: 1070px) and (max-height: 659px) {
    transform: scale(.5);
    bottom: -39px;
  }

  @media (min-width: 1070px) and (max-height: 629px) {
    display: none;
  }

  @media (max-width: 1069px) and (max-height: 729px) {
    transform: scale(.9);
    bottom: -55px;
  }

  @media (max-width: 1069px) and (max-height: 699px) {
    transform: scale(.8);
    bottom: -45px;
  }

  @media (max-width: 1069px) and (max-height: 669px) {
    transform: scale(.7);
    bottom: -40px;
  }

  @media (max-width: 1069px) and (max-height: 645px) {
    transform: scale(.6);
    bottom: -32px;
  }

  @media (max-width: 1069px) and (max-height: 624px) {
    transform: scale(.5);
    bottom: -24px;
  }

  @media (max-width: 1069px) and (max-height: 599px) {
    bottom: -40px;
  }

  @media (max-width: 1069px) and (max-height: 579px) {
    display: none;
  }
`;


const RemotePowerButtonOverlay = styled.div`
  background-color: transparent;
  width: 19px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;

  position: fixed;
  bottom: 210px;
  right: 393px;
  z-index: 40;

  transform: rotate(-8deg);

  @media (min-width: 1070px) and (max-height: 764px) {
    bottom: 164px;
    right: 313px;
    transform: scale(.8) rotate(-8deg);
  }

  @media (min-width: 1070px) and (max-height: 714px) {
    bottom: 141px;
    right: 272px;
    transform: scale(.7) rotate(-8deg);
  }

  @media (min-width: 1070px) and (max-height: 689px) {
    bottom: 116px;
    right: 232px;
    transform: scale(.6) rotate(-8deg);
  }

  @media (min-width: 1070px) and (max-height: 659px) {
    bottom: 92px;
    right: 192px;
    transform: scale(.5) rotate(-8deg);
  }

  @media (min-width: 1070px) and (max-height: 629px) {
    display: none;
  }

  @media (max-width: 1069px) and (max-height: 729px) {
    bottom: 187px;
    right: 353px;
    transform: scale(.9) rotate(-8deg);
  }

  @media (max-width: 1069px) and (max-height: 699px) {
    bottom: 169px;
    right: 313px;
    transform: scale(.8) rotate(-8deg);
  }

  @media (max-width: 1069px) and (max-height: 669px) {
    bottom: 146px;
    right: 272px;
    transform: scale(.7) rotate(-8deg);
  }


  @media (max-width: 1069px) and (max-height: 645px) {
    bottom: 127px;
    right: 232px;
    transform: scale(.6) rotate(-8deg);
  }

  @media (max-width: 1069px) and (max-height: 624px) {
    bottom: 107px;
    right: 192px;
    transform: scale(.5) rotate(-8deg);
  }

  @media (max-width: 1069px) and (max-height: 599px) {
    bottom: 91px;
  }

  @media (max-width: 1069px) and (max-height: 579px) {
    display: none;
  }

  @media (max-width: 849px) {
    display: none;
  }
`;


const TableImage = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;

  transform-origin: left bottom;

  @media (max-width: 849px), (max-height: 554px) {
    display: none;
  }

  @media (min-width: 1070px) and (max-height: 764px) {
    transform: scale(.8);
  }

  @media (min-width: 1070px) and (max-height: 714px) {
    transform: scale(.7);
  }

  @media (min-width: 1070px) and (max-height: 689px) {
    transform: scale(.6);
  }

  @media (min-width: 1070px) and (max-height: 659px) {
    transform: scale(.5);
  }

  @media (min-width: 1070px) and (max-height: 629px) {
    display: none;
  }

  @media (max-width: 1069px) and (max-height: 729px) {
    transform: scale(.9);
  }

  @media (max-width: 1069px) and (max-height: 699px) {
    transform: scale(.8);
  }

  @media (max-width: 1069px) and (max-height: 669px) {
    transform: scale(.7);
  }

  @media (max-width: 1069px) and (max-height: 645px) {
    transform: scale(.6);
  }

  @media (max-width: 1069px) and (max-height: 624px) {
    transform: scale(.5);
  }

  @media (max-width: 1069px) and (max-height: 599px) {
    bottom: -5px;
  }
`;


const TelevisionViewer = styled.div`
  background-color: transparent;
  background-repeat: no-repeat;
  width: 100%;
  z-index: 20;

  flex: 1 1 auto;

  @media (max-width: 489px) {
    background-image: url(${popcornInLeftHand}), url(${remoteInRightHand});
    background-position: left bottom, right bottom;
    background-size: ${({ size }) => size.height > 200 ? 'contain' : 0};
  }

  @media (min-width: 490px) and (max-width: 849px) {
    background-image: url(${manWatchingTV});
    background-position: center bottom;
    background-size: ${({ size }) => size.height > 150 ? 'contain' : 0};
  }

  @media (min-width: 850px) {
    display: none;
  }
`;


const InspirationModalContent = styled.div`
  position: relative;

  display: flex;
  align-items: flex-start;

  &::after {
    content: 'For this screen size there is an "Easter Egg" on the following page. Can you find it?';
    position: absolute;
    right: 0;
    bottom: 7px;
    color: #6d1414;
    font-size: .6em;
    font-family: "Roboto", sans-serif;
    width: 50%;
    text-align: center;

    @media (max-width: 849px), (max-height: 629px) {
      display: none;
    }

    @media (min-width: 850px) and (max-width: 1069px) and (min-height: 580px) {
      display: block;
    }
  }

  @media (max-width: 529px) {
    flex-direction: column;
    align-items: center;
  }
`;


const InspirationModalImage = styled.img`
  width: 50%;
  border-radius: 6px 0 0 6px;

  @media (max-width: 529px) {
    width: 100%;
    border-radius: 0 0 6px 6px;
  }
`;


const InspirationModalText = styled.div`
  color: #000;
  background-color: #dbc6ba;
  width: 50%;
  height: auto;
  border-radius: 0 6px 6px 0;
  padding: 0 31px 0 40px;
  font-family: "Quicksand", sans-serif;
  font-weight: 400;
  font-size: 1.2em;

  align-self: stretch;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 979px) {
    font-size: 1.1em;
  }

  @media (max-width: 889px) {
    padding: 0 27px 0 35px;
    font-size: 1em;
  }

  @media (max-width: 829px) {
    padding: 0 20px 0 30px;
    font-size: .9em;
  }

  @media (max-width: 739px) {
    padding: 0 15px 0 20px;
  }

  @media (max-width: 679px) {
    font-size: .8em;
  }

  @media (max-width: 619px) {
    font-size: .75em;
  }

  @media (max-width: 589px) {
    padding: 0 15px 0 15px;
  }

  @media (max-width: 569px) {
    padding: 0 10px 0 15px;
  }

  @media (max-width: 554px) {
    font-size: .7em;
  }

  @media (max-width: 529px) {
    font-size: 1.2em;
    padding: 33px 30px 40px 44px;
    border-radius: 6px 6px 0 0;
    width: 100%;

    align-self: center;
    order: -1;
  }

  @media (max-width: 489px) {
    padding: 30px 30px 32px 37px;
  }

  @media (max-width: 419px) {
    padding: 26px 28px 32px 34px;
    font-size: 1.1em;
  }

  @media (max-width: 329px) {
    padding: 22px 26px 28px 30px;
    font-size: 1em;
  }
`;


const InspirationModalParagraph = styled.p`
  padding: 7px 0;

  & span {
    color: #066d6d;
    font-weight: bold;
  }

  @media (max-width: 739px) {
    padding: 4px 0;
  }

  @media (max-width: 619px) {
    padding: 3px 0;
  }

  @media (max-width: 589px) {
    &:first-of-type {
      margin-top: 8px;
    }
  }

  @media (max-width: 529px) {
    padding: 7px 0;
  }

  @media (max-width: 419px) {
    padding: 4px 0;
  }
`;


export default Inspiration;
