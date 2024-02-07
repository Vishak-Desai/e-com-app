import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import './slider.css';

const Slider = () => {
    return (
        <Carousel className="carousel">
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100"
                src="https://mobirise.com/extensions/commercem4/assets/images/gallery00.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>BUY NOW</h3>
                <p>Sony Headphone for 1500 only</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                className="d-block w-100"
                src="https://mobirise.com/extensions/commercem4/assets/images/gallery04.jpg"
                alt="Second slide"
                />
                <Carousel.Caption>
                <h3>BUY NOW</h3>
                <p>Nike Shoes for 1000 only</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://mobirise.com/extensions/commercem4/assets/images/gallery03.jpg"
                alt="Third slide"
                />
                <Carousel.Caption>
                <h3>BUY NOW</h3>
                <p>HTC Mobile for 15000 only</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
    
}

export default Slider;
