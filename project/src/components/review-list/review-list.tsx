import { ReviewList } from 'types/review';
import { Review } from 'components';

type ReviewsListProps = {
  reviews: ReviewList;
};

function Reviews({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <li className="reviews__item" key={review.id} data-testid="reviewItem">
          <Review review={review} />
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
