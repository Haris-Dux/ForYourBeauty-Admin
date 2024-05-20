import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteReviewsAsync,
  getAllReviewsAsync,
} from "../features/reviewSlice";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} className="text-[#FFC209]" />);
  }
  return <div className="flex">{stars}</div>;
};

const Reviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.product);
  const reviews = useSelector((state) => state.review.reviews);
  console.log("reviews", reviews);

  useEffect(() => {
    dispatch(getAllReviewsAsync());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteReviewsAsync({ id })).then((res) => {
      if (res.payload.message === "Review deleted successfully") {
        dispatch(getAllReviewsAsync());
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <>
          <div
            className="mx-auto flex justify-center items-center h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
            role="status"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <section className="bg-[#E5E5E5] dark:bg-gray-900 py-8 sm:py-10 mx-auto min-h-screen max-w-screen-xl px-4 lg:px-8">
            <div className="bg-white py-8 antialiased dark:bg-gray-800 md:py-16 rounded-lg">
              <div className="mx-auto px-6 2xl:px-6">
                {/* HEADER SECTION */}
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Reviews
                  </h2>
                  <div className="mt-2 flex items-center gap-2 sm:mt-0">
                    <div className="mb-2 flex items-center justify-center gap-1">
                      <FaStar size={16} className="text-[#FFC107]" />
                      <FaStar size={16} className="text-[#FFC107]" />
                      <FaStar size={16} className="text-[#FFC107]" />
                      <FaStar size={16} className="text-[#FFC107]" />
                      <FaStar size={16} className="text-[#FFC107]" />
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      (4.6)
                    </p>
                    <p className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                      {reviews?.reviewsData?.length} Reviews{" "}
                    </p>
                  </div>
                </div>

                {/* PER STAR AVERAGE */}
                <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
                  <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
                    <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                      4.65 out of 5
                    </p>
                    <div className="flex items-center pl-2 gap-2">
                      <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                        5
                      </p>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-yellow-300"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-yellow-300"
                          style={{
                            width: "20%",
                          }}
                        />
                      </div>
                      <a
                        className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                        href="#"
                      >
                        239 <span className="hidden sm:inline">reviews</span>
                      </a>
                    </div>
                    <div className="flex items-center pl-2 gap-2">
                      <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                        4
                      </p>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-yellow-300"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-yellow-300"
                          style={{
                            width: "60%",
                          }}
                        />
                      </div>
                      <a
                        className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                        href="#"
                      >
                        432 <span className="hidden sm:inline">reviews</span>
                      </a>
                    </div>
                    <div className="flex items-center pl-2 gap-2">
                      <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                        3
                      </p>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-yellow-300"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-yellow-300"
                          style={{
                            width: "15%",
                          }}
                        />
                      </div>
                      <a
                        className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                        href="#"
                      >
                        53 <span className="hidden sm:inline">reviews</span>
                      </a>
                    </div>
                    <div className="flex items-center pl-2 gap-2">
                      <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                        2
                      </p>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-yellow-300"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-yellow-300"
                          style={{
                            width: "5%",
                          }}
                        />
                      </div>
                      <a
                        className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                        href="#"
                      >
                        32 <span className="hidden sm:inline">reviews</span>
                      </a>
                    </div>
                    <div className="flex items-center pl-2 gap-2">
                      <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                        1
                      </p>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-yellow-300"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-yellow-300"
                          style={{
                            width: "0%",
                          }}
                        />
                      </div>
                      <a
                        className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                        href="#"
                      >
                        13 <span className="hidden sm:inline">reviews</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ALL REVIEWS SECTION */}
                <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
                  {reviews?.reviewsData?.map((data, index) => (
                    <div
                      key={index}
                      className="gap-3 pt-6 pb-6 sm:flex sm:items-start"
                    >
                      <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                        <div className="flex items-center gap-0.5">
                          <StarRating rating={data?.rating} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-base font-semibold text-gray-900 dark:text-white">
                            Name
                          </p>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {new Date(data?.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                          {data?.review}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(data?.id)}
                        className="text-red-500 font-medium hover:underline hover:underline-offset-4"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Reviews;
