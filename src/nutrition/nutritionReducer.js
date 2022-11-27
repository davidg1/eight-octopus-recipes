const nutritionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NUTRIENT_AMOUNTS_IN_100_GRAMS':
      return {
        ...state,
        nutrientAmountsIn100Grams: action.payload
      };
    
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload
      };
    
    case 'SET_FIG_CAPTION':
      return {
        ...state,
        figCaption: action.payload
      };
    
    case 'SET_SERVING_SIZE_VALUE':
      return {
        ...state,
        servingSizeValue: action.payload
      };
    
    case 'SET_SERVING_SIZE_UNIT':
      return {
        ...state,
        servingSizeUnit: action.payload
      };
    
      case 'SET_LAST_CLICKED_BUTTON':
      return {
        ...state,
        lastClickedButton: action.payload
      };

      default: 
        throw new Error("No Matching Action");
  }
}

export default nutritionReducer;



