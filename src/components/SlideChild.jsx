import { Carousel } from 'react-carousel-minimal';

export default function SliderChild(data){
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return(
      <div className="App">
          <div style={{ textAlign: "center" }}>
              <div style={{
              padding: "0 20px"
              }}>
              <Carousel
                  data={data.slider}
                  time={3000}
                  width="1200px"
                  height="300px"
                  captionStyle={captionStyle}
                  radius="10px"
                  slideNumber={false}
                  slideNumberStyle={slideNumberStyle}
                  captionPosition="bottom"
                  automatic={false}
                  dots={true}
                  pauseIconColor="white"
                  pauseIconSize="40px"
                  slideBackgroundColor="darkgrey"
                  slideImageFit="cover"
                  thumbnails={false}
                  style={{
                  textAlign: "center",
                  maxWidth: "1200px",
                  maxHeight: "300px",
                  margin: "40px auto",
                  }}
              />
              </div>
          </div>
      </div>
    )
}