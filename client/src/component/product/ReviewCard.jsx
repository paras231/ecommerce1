import React from "react";
import { Rating } from "@material-ui/lab";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="reviewCard">
        <img src="" alt="user" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
