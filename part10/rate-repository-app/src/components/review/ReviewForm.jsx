import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client/react";

import { ADD_REVIEW } from "../../graphql/mutations";
import { GET_CURRENT_USER } from "../../graphql/queries";
import useRepositories from "../../hooks/useRepositories";
import useCurrentUser from "../../hooks/useCurrentUser";
import ReviewFormContainer from "./ReviewFormContainer";

const ReviewForm = () => {
  const { reviewedRepositories } = useCurrentUser();
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const reviewedRepositoryNames = reviewedRepositories.map(
    (r) => r.repository.fullName
  );

  const [createReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const onSubmit = async (values) => {
    const review = { ...values, rating: Number(values.rating) };

    try {
      const { data } = await createReview({ variables: { review } });
      navigate(`/repos/${data.createReview.repositoryId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ReviewFormContainer
      reviewedRepositories={reviewedRepositoryNames}
      repositories={repositories}
      onSubmit={onSubmit}
    />
  );
};

export default ReviewForm;
