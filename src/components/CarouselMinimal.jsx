import { Carousel } from 'react-carousel-minimal';
import { useState } from 'react';

function CarouselMinimal(props) {
  const slider = [];
  for(var i = 0; i< props.data.length; i++){
    slider.push({"image": props.data[i].link})
  }

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={slider}
            time={3000}
            width="600px"
            height="600px"
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
            thumbnails={true}
            thumbnailWidth="80px"
            style={{
              textAlign: "center",
              maxWidth: "600px",
              maxHeight: "600px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselMinimal;
