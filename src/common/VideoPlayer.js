import styled from 'styled-components';

const VideoPlayer = props => {
  // props.sources is an array of objects.  Each object has a src property and a type property)
  const sourceElements = props.sources.map(({src, type, id}) =>
    (<source src={src} type={type} key={id} />)
  );

  return (
    <Video {...props}>
      {sourceElements}
    </Video>
  );
}


const Video = styled.video.attrs({
  controlsList: 'nodownload nofullscreen'
})`
   width: ${({ width }) => width ? width : 'auto'};
   height: ${({ height }) => height ? height : 'auto'};
   outline: none;
`;


export default VideoPlayer;
