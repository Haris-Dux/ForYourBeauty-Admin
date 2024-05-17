import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllQueriesAsync } from "../features/contactSlice";

const ContactQueries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryId, setQueryId] = useState(null);

  // GETTING QUERIES
  const { queries, isLoading } = useSelector((state) => state.contact);
  console.log("queries", queries);

  useEffect(() => {
    dispatch(getAllQueriesAsync());
  }, []);

  const handleMsgShow = (id) => {
    navigate(`/admin/client-message/${id}`);
  };

  // TOGGLE MODAL
  const toggleModal = (id) => {
    setQueryId(id);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div
            className="mx-auto flex justify-center items-center h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 min-h-screen"
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
          <section className="bg-gray-200 dark:bg-gray-900 p-3 sm:p-5 min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-3">
              <div className="bg-white dark:bg-gray-800 relative shadow-md overflow-hidden">
                <h2 className="p-6 text-2xl font-semibold text-gray-700 dark:text-gray-100 tracking-wide">
                  Contact Queries
                </h2>

                {/* ----------- TABLE ----------- */}
                <div className="overflow-x-auto">
                  <table className="w-full text-md text-left text-gray-500 dark:text-gray-100">
                    <thead className="text-sm tracking-wide text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-200">
                      <tr>
                        <th className="px-4 py-4" scope="col">
                          Sr #
                        </th>
                        <th className="px-4 py-4" scope="col">
                          Client Name
                        </th>
                        <th className="px-4 py-4" scope="col">
                          Email
                        </th>
                        <th className="px-4 py-4" scope="col">
                          Date
                        </th>
                        <th className="px-4 py-4" scope="col">
                          Message
                        </th>
                        <th className="px-4 py-4" scope="col">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {queries?.orders?.map((data, index) => (
                        <tr
                          key={index}
                          onClick={() => handleMsgShow(data.id)}
                          className="border-b border-gray-500 cursor-pointer"
                        >
                          <th
                            className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            scope="row"
                          >
                            {index + 1}
                          </th>
                          <td className="px-4 py-4">{data.name}</td>
                          <td className="px-4 py-4">{data.email}</td>
                          <td className="px-4 py-4">
                            {new Date(data?.createdAt).toLocaleDateString()}
                          </td>

                          <td className="px-4 py-4">
                            <p>
                              {data.message.length > 50
                                ? `${data.message.substring(0, 30)}`
                                : data.message}{" "}
                              ...
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ContactQueries;
