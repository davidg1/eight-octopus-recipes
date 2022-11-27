import styled from 'styled-components';

const Button = styled.button.attrs({
  type: 'button'
})`
  color: ${({ colors }) => colors && colors[0] ? colors[0] : '#fff'};
  background-color: ${({ colors }) => colors && colors[1] ? colors[1] : '#000'};
  border: 3px solid ${({ colors }) => colors && colors[1] ? colors[1] : '#000'};
  border-radius: 10px;
  font-family: ${({ fontFamily }) => fontFamily ? fontFamily : 'sans-serif'};
  font-size: 1.5em;
  width: 120px;
  padding: .3em;
  box-shadow: 1px 1px 2px ${({ colors }) => colors && colors[2] ? colors[2] : '#282828'};

  &:hover {
    color:  ${({ colors }) => colors && colors[1] ? colors[1] : '#000'};
    background-color: ${({ colors }) => colors && colors[0] ? colors[0] : '#fff'};
  }
`;

export default Button;
