import "./collections.css"
import Image from "../image/image";

function Collections() {
  return (
    <div className="collections">
      <div className="collection">
        <Image path="/pins/pin1.jpeg" alt="" />
        <div className="collectionsInfo">
          <h1>Minimalist Bedrooms</h1>
          <span>12 Pins · 1w</span>
        </div>
      </div>
      <div className="collection">
        <Image path="/pins/pin1.jpeg" alt="" />
        <div className="collectionsInfo">
          <h1>Minimalist Bedrooms</h1>
          <span>12 Pins · 1w</span>
        </div>
      </div>
      <div className="collection">
        <Image path="/pins/pin1.jpeg" alt="" />
        <div className="collectionsInfo">
          <h1>Minimalist Bedrooms</h1>
          <span>12 Pins · 1w</span>
        </div>
      </div>
    </div>
  );
}

export default Collections;