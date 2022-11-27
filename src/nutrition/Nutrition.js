import React, { useReducer } from 'react';
import styled, { keyframes } from 'styled-components';

import ImagesLoader from '../common/ImagesLoader';
import Button from '../common/Button';
import nutritionReducer from './nutritionReducer';
import useGetApiData from '../common/useGetApiData';

import spinnerOctopus from '../assets/images/spinner-octopus.png';
import chefWithOctopus from '../assets/images/chef-with-octopus.jpg';
import octopusNutritionSideways from '../assets/images/octopus-nutrition-sideways.png';
import octopusNutrition from '../assets/images/octopus-nutrition.png';
import boiledOctopus from '../assets/images/boiled-octopus.jpg';
import cannedPickledOctopus from '../assets/images/canned-pickled-octopus.jpg';
import octopusGummiCandy from '../assets/images/octopus-gummi-candy.jpg';
import nutritionBackground from '../assets/images/nutrition-background.jpg';

// Because it is used in two different locations in this code, I used a variable to set
// the size percentage value of the background image of the NutritionTitle component.
const NutritionTitleBackgroundImageSizePercentage = '90%';

const beige = '#f0e1c8';
const darkBeige = '#e9c78e';
const lightBeige = '#f9f0e0';
const burgandy = '#a80a45';
const purpleBlue = '#44449b';
const lightRed = '#e09393';

const scaleLarger = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-500px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(500px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const rotateDown = keyframes`
  from {
    transform: rotate(180deg);
    opacity: 0;
  }

  to {
    transform: rotate(0deg);
    opacity: 1;
  }
`;

const slideInFromTop = keyframes`
  from {
    transform: translateY(-300px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;


const Nutrition = props => {
  const initialNutritionState = {
    image: chefWithOctopus,
    figCaption: 'Click a Button',
    servingSizeValue: '100',
    servingSizeUnit: 'g',
    lastClickedButton: ''
  };

  const [nutritionState, dispatch] = useReducer(nutritionReducer, initialNutritionState);
  
  const [data, isLoading, isError, setUrl] = useGetApiData();

  const handleClick = event => {
    let databaseNumber, image, figCaption;

    switch (event.target.name) {
      case 'boiled':
        databaseNumber = '174249';
        image = boiledOctopus;
        figCaption = 'Boiled Octopus';
        break;
      case 'pickled':
        databaseNumber = '1930527';
        image = cannedPickledOctopus;
        figCaption = 'Pickled Octopus';
        break;
      case 'candy':
        databaseNumber = '2170041';
        image = octopusGummiCandy;
        figCaption = 'Octopus Candy';
      /* no default */
    }

    const requestUrl = `https://api.nal.usda.gov/fdc/v1/food/${databaseNumber}?api_key=${process.env.REACT_APP_USDA_API_KEY}`;

    setUrl(requestUrl);

    dispatch({ type: 'SET_IMAGE', payload: image });
    dispatch({ type: 'SET_FIG_CAPTION', payload: figCaption });
    dispatch({ type: 'SET_LAST_CLICKED_BUTTON', payload: event.target.name });
  };

  const handleInputChange = event => {
    // Only allow values of 0-999
    if (event.target.value >= 0 && event.target.value < 1000) {
      dispatch({ type: 'SET_SERVING_SIZE_VALUE', payload: event.target.value });
    } else if (event.target.value >= 1000) {
      dispatch({ type: 'SET_SERVING_SIZE_VALUE', payload: 999 });
    } else {
      dispatch({ type: 'SET_SERVING_SIZE_VALUE', payload: 0 });
    }
  };

  const handleSelectChange = event => {
    dispatch({ type: 'SET_SERVING_SIZE_UNIT', payload: event.target.value });
  }

  let filteredNutrientsObject;

  if (data) {
    filteredNutrientsObject = data.foodNutrients.reduce((accObj, food) => {

      switch (food.nutrient.number) {
        case '208':
          accObj.calories = food.amount;
          return accObj;
        case '203':
          accObj.protein = food.amount;
          return accObj;
        case '205':
          accObj.totalCarbs = food.amount;
          return accObj;
        case '204':
          accObj.totalFat = food.amount;
          return accObj;
        default:
          return accObj;
      }

    }, {});
  } else {
    filteredNutrientsObject = {
      'calories': 0,
      'protein': 0,
      'totalFat': 0,
      'totalCarbs': 0
    };
  }

  const conversionFactor = nutritionState.servingSizeUnit === 'g' ? nutritionState.servingSizeValue/100 : (nutritionState.servingSizeValue * 28.3495)/100

  const nutrientAmountsInGrams = ['calories', 'protein', 'totalCarbs', 'totalFat'].reduce((accObj, str) => {
    accObj[str] = (filteredNutrientsObject[str] * conversionFactor).toFixed(1);
    return accObj;
  }, {});

  const nutritionImageSources = [chefWithOctopus, octopusNutritionSideways, octopusNutrition];

  if (!props.nutritionImagesLoaded) {
    return (
      <ImagesLoader
        imageSources={nutritionImageSources}
        spinnerImageSource={spinnerOctopus}
        imageLoadHandler={props.imageLoadHandler}
        imagesName="nutrition"
      />
    )
  }

  return (
    <NutritionOuterWrapper>
      <NutritionInnerWrapper>
        <NutritionTitle />

        <NutritionButtons
          onClick={handleClick}
          lastClickedButton={nutritionState.lastClickedButton}
          colors={[beige, burgandy, '#4c1229']}
          fontFamily={`'Abril Fatface', serif`}
        >
          <NutritionButton name="boiled" leftOffset="75%">Boiled</NutritionButton>
          <NutritionButton name="pickled" leftOffset="50%">Pickled</NutritionButton>
          <NutritionButton name="candy" leftOffset="25%">Candy</NutritionButton>
        </NutritionButtons>

        <ServingSize>
          <ServingSizeLabel isInputNumberValid={nutritionState.isInputNumberValid}>Serving Size: </ServingSizeLabel>
          <ServingSizeInput value={nutritionState.servingSizeValue} onChange={handleInputChange} />
          <ServingSizeUnitsSelect value={nutritionState.servingSizeUnit} onChange={handleSelectChange}>
            <ServingSizeUnitsOption>g</ServingSizeUnitsOption>
            <ServingSizeUnitsOption>oz</ServingSizeUnitsOption>
          </ServingSizeUnitsSelect>
        </ServingSize>
        
        <Nutrients>
          {['Calories', 'Protein', 'Total Carbs', 'Total Fat'].map((str, index) => (
            <Nutrient key={index}>
              <NutrientHeading>{str}</NutrientHeading>
              <NutrientGramsPerServing>
                {isLoading && <NutrientDataLoading/>}
                {isError && <NutrientDataError/>}
                {(!isLoading && !isError) && ( 
                  <>
                    {nutrientAmountsInGrams[str.replace(/\s+/g, '').replace(/^\w/, character => (character.toLowerCase()))]}
                    <NutrientUnit>{str === 'Calories' ? '' : 'g'}</NutrientUnit>
                  </>
                )}
              </NutrientGramsPerServing>
            </Nutrient>
          ))}
        </Nutrients>

        <NutritionFigure>
          <NutritionImage src={nutritionState.image} alt="nutrition" />
          <NutritionFigCaption>{nutritionState.figCaption}</NutritionFigCaption>
        </NutritionFigure>
        <NutritionDataSource>Information from the USDA's "FoodData Central" Database</NutritionDataSource>
      </NutritionInnerWrapper>
    </NutritionOuterWrapper>
  );
}


const NutritionOuterWrapper = styled.div`
  height: 100%;
  min-height: 670px;
  overflow: hidden;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 769px) {
    height: auto;
    justify-content: flex-start;
  }

  &::after {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #85A4D0;
    background-image: url(${nutritionBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;


const NutritionInnerWrapper = styled.div`
  background-color: ${beige};
  border: 4px solid ${burgandy};
  border-radius: 9px;
  width: 560px;
  padding: 32px 15px 5px;
  margin-top: 65px;
  margin-left: 163px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, .6);

  position: relative;
  z-index: 10;

  @media (max-width: 769px) {
    margin-top: 130px;
    margin-bottom: 8px;
    margin-left: 0;
  }

  @media (max-width: 589px) {
    width: 95%;
    padding: 32px 40px 5px;

    {/* Although the height of the NutritionTitle background image varies depending on the width
    of the NutritionInnerWrapper, the calculation below sets the margin-top value of the
    NutritionInnerWrapper so that the top of this background image has a constant margin between
    it and the top of the viewport. The .09464 value is based on the dimensions of the
    background image (560px x 53px). Also because it is used in two different locations in this
    code, I used a variable to set the size percentage value of the background image of the
    NutritionTitle component. */}
    margin-top: calc(79px + ${NutritionTitleBackgroundImageSizePercentage} * .09464);
  }

  @media (max-width: 519px) {
    {/* See comments above for explanation for of calc() below. */}
    margin-top: calc(73px + ${NutritionTitleBackgroundImageSizePercentage} * .09464286);
  }

  @media (max-width: 459px) {
    {/* See comments above for explanation for of calc() below. */}
    margin-top: calc(68px + ${NutritionTitleBackgroundImageSizePercentage} * .09464286);

    padding: 18px 0 5px;
  }

  @media (max-width: 359px) {
    padding: 14px 0 5px;
  }
`;


const NutritionDataSource = styled.p`
  color: navy;
  font-size: .8em;
  margin-top: 30px;
  z-index: 10;

  animation: ${fadeIn} 3000ms;

  @media (max-width: 459px) {
    margin-top: 25px;
  }

  @media (max-width: 359px) {
    font-size: 0.7em;
    margin-top: 20px;
  }
`;


const NutritionTitle = styled.div`
  background-image: url(${octopusNutritionSideways});
  background-size: 100% 100%;
  width: 167px;
  height: 92%;

  position: absolute;
  top: 4%;
  left: -177px;
  z-index: 20;

  transform-origin: right top;

  animation: ${rotateDown} 1500ms 1600ms backwards;

  @media (max-width: 769px) {
    background-image: url(${octopusNutrition});

    // Because it is used in two different locations in this code, I used a variable to set
    // the size percentage value of the background image of the NutritionTitle component.
    background-size: ${NutritionTitleBackgroundImageSizePercentage};

    background-repeat: no-repeat;
    background-position: center bottom;

    width: 100%;
    height: 100px;

    top: -112px;
    left: 0;

    transform-origin: initial;

    animation: ${slideInFromTop} 1500ms 1600ms backwards;
  }
`;


const NutritionButtonsWrapper = styled.div`
  margin-bottom: 35px;

  animation: ${fadeIn} 3000ms;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 459px) {
    margin-bottom: 25px;
  }

  @media (max-width: 359px) {
    margin-bottom: 17px;
  }
`;


const NutritionButtons = props => {
  const { children, ...otherProps } = props;
  const newChildren = React.Children.map(children, child => React.cloneElement(child, otherProps));

  return (
    <NutritionButtonsWrapper>
      {newChildren}
    </NutritionButtonsWrapper>
  );
};


const NutritionButton = styled(Button)`
  color: ${props => (props.name === props.lastClickedButton ? burgandy : beige)};
  background-color: ${props => (props.name === props.lastClickedButton ? beige : burgandy)};

  position: relative;

  &:nth-of-type(2) {
    margin: 0 15px 0;
  }

  &::after, &::before {
    content: "";
  	position: absolute;
  	top: 100%;
  	left: ${props => (props.leftOffset)};

    display: ${props => (props.name === props.lastClickedButton ? 'block' : 'none')};

  	transform: translateX(-50%);
  }

  &::before {
  	border: 15px solid transparent;
  	border-top: 15px solid ${burgandy};
  }

  &::after {
  	border: 10px solid transparent;
  	border-top: 10px solid ${beige};
  }

  &:focus {
    outline: none;
    text-decoration: ${({ name, lastClickedButton }) => (name === lastClickedButton ? 'none' : 'underline')};
  }

  &:focus:active {
    outline: none;
    text-decoration: none;
  }

  @media (max-width: 459px) {
    width: 29%;
    font-size: 1.3em;
    padding: .1em 0;

    &:nth-of-type(2) {
      margin: 0 10px 0;
    }

    &::before {
    	border: 13px solid transparent;
    	border-top: 13px solid ${burgandy};
    }

    &::after {
    	border: 8px solid transparent;
    	border-top: 8px solid ${beige};
    }
  }
`;


const ServingSize = styled.div`
  margin-bottom: 30px;

  animation: ${fadeIn} 3000ms;

  @media (max-width: 459px) {
    margin-bottom: 15px;
  }

  @media (max-width: 359px) {
    margin-bottom: 11px;
  }
`;


const ServingSizeLabel = styled.label`
  color: navy;
  font-family: "Bitter", serif;
  font-weight: 700;
  font-size: 1.2em;
  margin-right: 2px;

  @media (max-width: 359px) {
    font-size: 1.05em;
  }
`;


const ServingSizeInput = styled.input.attrs({
  type: 'number',
})`
  color: ${purpleBlue};
  background-color: ${lightBeige};
  width: 3.6em;
  height: 2.1em;
  border: 2px solid navy;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 1em;
  padding-top: 2px;
  padding-left: 3px;
  margin-right: 3px;

  outline-color: ${burgandy};

  @media (max-width: 459px) {
    height: 1.9em;
  }

  @media (max-width: 359px) {
    height: 1.8em;
    font-size: 0.95em;
  }
`;


const ServingSizeUnitsSelect = styled.select`
  color: ${purpleBlue};
  background-color: ${lightBeige};
  border: 2px solid navy;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 1em;
  width: 3.1em;
  height: 2.1em;
  padding-top: 2px;
  padding-left: 3px;

  outline-color: ${burgandy};

  @media (max-width: 459px) {
    height: 1.9em;
  }

  @media (max-width: 359px) {
    height: 1.8em;
    font-size: 0.95em;
  }
`;


const ServingSizeUnitsOption = styled.option`
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 1em;
  border-style: none;
`;


const Nutrients = styled.div`
  border: 1px solid ${burgandy};
  padding: 15px;
  margin: 0 6px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  animation: ${scaleLarger} 1800ms 800ms backwards;

  @media (max-width: 589px) {
    border: none;
    padding: 5px 24px;
    margin: 0 auto 30px;

    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 459px) {
    margin-bottom: 10px;
  }

  @media (max-width: 359px) {
    padding: 5px 0;
    margin-bottom: 8px;

    justify-content: space-evenly;
  }
`;


const Nutrient = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 589px) {
    border: 1px solid ${burgandy};
    width: 134px;
    padding: 5px 0;

    &:nth-of-type(even) {
      margin-left: 9px;
    }

    &:nth-of-type(odd) {
      margin-right: 9px;
    }

    &:nth-of-type(-n+2) {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 359px) {
    &:nth-of-type(even) {
      margin-left: 0;
    }

    &:nth-of-type(odd) {
      margin-right: 0;
    }
  }
`;


const NutrientHeading = styled.h5`
  color: ${burgandy};
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: .8em;
`;


const NutrientGramsPerServing = styled.p`
  color: navy;
  font-family: "Days One", sans-serif;
  font-weight: 900;
  font-size: 1.3em;
  letter-spacing: .1em;
`;


const NutrientUnit = styled.span`
  color: ${burgandy};
  font-family: "Quicksand", sans-serif;
  font-size: .7em;
  font-weight: 400;
`;


const NutrientDataLoading = styled.p`
  &::before {
    content: "Loading"
  }

  color: ${darkBeige};
  font-family: "Days One", sans-serif;
  font-weight: 900;
  transform: scale(70%);
`;

const NutrientDataError = styled.p`
  &::before {
    content: "Error"
  }

  color: ${lightRed};
  font-family: "Days One", sans-serif;
  font-weight: 900;
  transform: scale(75%);
`;


const NutritionFigure = styled.figure`
  position: relative;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    border: 4px solid ${beige};
    border-radius: 6px;

    @media (max-width: 359px) {
      top: 8px;
      right: 8px;
      bottom: 8px;
      left: 8px;
      border: 2px solid ${beige};
    }
  }
`;


const NutritionImage = styled.img`
  border-radius: 6px;
  height: 250px;
  vertical-align: middle;

  animation: ${slideInFromLeft} 1500ms 1600ms backwards;

  @media (max-width: 359px) {
    height: 180px;
  }
`;


const NutritionFigCaption = styled.figcaption`
  color: ${burgandy};
  background-color: rgba(242, 217, 176, .9);
  border-radius: 5px;
  font-family: "Quicksand", sans-serif;
  font-size: 1.5em;
  line-height: 1.1;
  width: 115px;
  padding: 10px 0;
  margin-right: -60px;

  display: block;
  text-align: center;

  position: absolute;
  top: 20%;
  right: 0;

  animation: ${slideInFromRight} 1500ms 1600ms backwards;

  @media (max-width: 459px) {
    font-size: 1.3em;
    width: 90px;
    padding: 5px 0;
    margin-right: -28px;
  }

  @media (max-width: 359px) {
    font-size: 1.1em;
    width: 70px;
    margin-right: -38px;
  }
`;


export default Nutrition;
