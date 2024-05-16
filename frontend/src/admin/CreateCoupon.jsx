import { useDispatch, useSelector } from "react-redux";
// import product from "./ProductData";
import { useEffect, useRef, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import {
  createCoupunAsync,
  deleteCoupunAsync,
  getAllCoupunAsync,
} from "../features/couponSlice";
import CouponUpdateModal from "./CouponUpdateModal";

const CreateCoupon = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.product);

  const [updatedCouponId, setUpdatedCouponId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const dropdownRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const coupons = useSelector((state) => state.coupons.coupon);
  // console.log("coupons", coupons);

  const selectedCoupon = coupons.filter((data) => data.id === updatedCouponId);
  // console.log("selectedCoupon", selectedCoupon);

  useEffect(() => {
    dispatch(getAllCoupunAsync());
  }, []);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [formdata, setFormdata] = useState({
    code: "",
    discountAmount: 0,
    total_limit: 0,
    expiresAt: "",
    allProducts: false,
    categories: selectedCategory,
    isActive: true,
  });

  const [updateFormData, setUpdateFormData] = useState({
    code: "",
    expireAt: "",
    discount: "",
    useLimit: "",
    category: "",
    allProducts: false,
    isActive: false,
  });

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    setFormdata({
      ...formdata,
      categories: category,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formdata);

    if (formdata.allProducts === true) {
      delete formdata.categories;
      dispatch(createCoupunAsync(formdata)).then((res) => {
        if (res.payload.message === "Coupon Created") {
          dispatch(getAllCoupunAsync());
        }
      });
    } else {
      delete formdata.allProducts;
      dispatch(createCoupunAsync(formdata)).then((res) => {
        if (res.payload.message === "Coupon Created") {
          dispatch(getAllCoupunAsync());
        }
      });
    }
  };

  // HANDLE UPDATE COUPON
  const handleUpdateCoupon = (couponId) => {
    setOpenModal(true);
    setUpdatedCouponId(couponId);

    // Find the selected coupon from the coupons list
    const selectedCoupon = coupons.find((coupon) => coupon.id === couponId);
    if (selectedCoupon) {
      setUpdateFormData({
        code: selectedCoupon.code || "",
        expireAt: selectedCoupon.expiresAt || "",
        discount: selectedCoupon.discountAmount || "",
        useLimit: selectedCoupon.total_limit || "",
        category: selectedCoupon.categories[0] || "",
        allProducts: selectedCoupon.users.length === 0,
        isActive: selectedCoupon.isActive || false,
      });
    }
  };

  // HANDLE DELETE
  const handleDelete = (id) => {
    console.log("id", id);
    dispatch(deleteCoupunAsync({ id })).then((res) => {
      if (res.payload.message === "Coupon deleted") {
        dispatch(getAllCoupunAsync());
      }
    });
  };

  const data = [
    {
      name: "Suheer",
      userId: "8923023",
      phone: "03123516584",
      amount: "6650",
      order_progress: "Dispatach",
    },
    {
      name: "Haris",
      userId: "8923023",
      phone: "03123516584",
      amount: "6650",
      order_progress: "Dispatach",
    },
    {
      name: "Umer",
      userId: "8923023",
      phone: "03123516584",
      amount: "6650",
      order_progress: "Dispatach",
    },
    {
      name: "Suheer",
      userId: "8923023",
      phone: "03123516584",
      amount: "6650",
      order_progress: "Dispatach",
    },
  ];

  return (
    <>
      {isLoading ? (
        <>
          <div
            className="mx-auto flex justify-center min-h-screen items-center h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
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
          <section className="bg-[#E5E5E5] dark:bg-gray-900 min-h-[95vh] py-8 sm:py-10 mx-auto max-w-screen-xl px-4 lg:px-10">
            <h2 className="playfair text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
              Create Coupon
            </h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-2 lg:gap-4">
              {/* Code */}
              <div className="">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  htmlFor="code"
                >
                  Coupon code
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="code"
                  name="code"
                  placeholder="Enter Code"
                  type="text"
                  value={formdata.code}
                  onChange={(e) =>
                    setFormdata({ ...formdata, code: e.target.value })
                  }
                  required
                />
              </div>

              {/* DISCOUNT AMOUNT */}
              <div className="">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  htmlFor="discountAmount"
                >
                  Discount Amount
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="discountAmount"
                  name="discountAmount"
                  placeholder="Enter Discount Amount"
                  type="text"
                  value={formdata.discountAmount}
                  onChange={(e) =>
                    setFormdata({ ...formdata, discountAmount: e.target.value })
                  }
                  required
                />
              </div>

              {/* Total_limit */}
              <div className="">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  htmlFor="total_limit"
                >
                  Total Limit
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="total_limit"
                  name="total_limit"
                  placeholder="Enter Total Limit"
                  type="text"
                  value={formdata.total_limit}
                  onChange={(e) =>
                    setFormdata({ ...formdata, total_limit: e.target.value })
                  }
                  required
                />
              </div>

              {/* Expires At */}
              <div className="">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  htmlFor="expiresAt"
                >
                  Expire At
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="expiresAt"
                  name="expiresAt"
                  placeholder="Select Date"
                  type="date"
                  value={formdata.expiresAt}
                  onChange={(e) =>
                    setFormdata({ ...formdata, expiresAt: e.target.value })
                  }
                  required
                />
              </div>

              {/* DROPDOWN FOR SELECTING CATEGORIES */}
              <div className="mt-1">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  htmlFor="select_category"
                >
                  Select Category
                </label>

                <div ref={dropdownRef} className="relative">
                  <button
                    className={`w-[100%] text-start flex items-center justify-between py-2.5 px-4 text-sm font-medium text-gray-600 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                      isCheckboxChecked ? "pointer-events-none opacity-50" : ""
                    }`}
                    id="filterDropdownButton"
                    type="button"
                    onClick={toggleDropdown}
                    disabled={isCheckboxChecked}
                  >
                    {selectedCategory ? selectedCategory : "Select Category"}

                    <svg
                      aria-hidden="true"
                      className={`-mr-1 ml-1.5 w-6 h-6 transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>

                  {isOpen && !isCheckboxChecked && (
                    <div
                      className="w-full absolute right-0 mt-3 py-3 bg-white rounded-lg shadow-lg dark:bg-gray-700"
                      id="filterDropdown"
                    >
                      <ul
                        aria-labelledby="filterDropdownButton"
                        className="text-sm"
                      >
                        <li
                          className="px-4 py-2.5 flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 cursor-pointer"
                          onClick={() => handleCategorySelect("Skincare")}
                        >
                          Skincare
                        </li>
                        <li
                          className="px-4 py-2.5 flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 cursor-pointer"
                          onClick={() => handleCategorySelect("Body Care")}
                        >
                          Body Care
                        </li>
                        <li
                          className="px-4 py-2.5 flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 cursor-pointer"
                          onClick={() => handleCategorySelect("Haircare")}
                        >
                          Haircare
                        </li>
                        <li
                          className="px-4 py-2.5 flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 cursor-pointer"
                          onClick={() => handleCategorySelect("Cosmetics")}
                        >
                          Cosmetics
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <fieldset className="px-10 pt-6 flex justify-between items-center gap-4">
                <label
                  htmlFor="Option1"
                  className="flex cursor-pointer items-start gap-2"
                >
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option1"
                      checked={formdata.allProducts}
                      onChange={() =>
                        setFormdata({
                          ...formdata,
                          allProducts: !formdata.allProducts,
                        })
                      }
                    />
                  </div>
                  <div>
                    <strong className="font-medium text-gray-900 dark:text-gray-100">
                      All Product
                    </strong>
                  </div>
                </label>

                <label
                  htmlFor="Option3"
                  className="flex cursor-pointer items-start gap-2"
                >
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option3"
                      checked={formdata.isActive}
                      onChange={() =>
                        setFormdata({
                          ...formdata,
                          isActive: !formdata.isActive,
                        })
                      }
                    />
                  </div>

                  <div>
                    <strong className="font-medium text-gray-900 dark:text-gray-100">
                      Is Active{" "}
                    </strong>
                  </div>
                </label>
              </fieldset>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-7 flex justify-center items-center mx-auto px-6 py-2.5 bg-[#EC72AF] text-white"
            >
              Create Now
            </button>

            <div className="overflow-x-auto mt-14">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-400">
                  <tr>
                    <th className="px-5 py-4" scope="col">
                      Sr
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Code
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Expires
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Discount
                    </th>
                    <th className="px-7 py-4" scope="col">
                      isActive
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Uses Count
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Use limit
                    </th>
                    <th className="px-7 py-4" scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-gray-50 dark:bg-gray-800">
                  {coupons?.map((data, index) => (
                    <tr key={index} className="border-b dark:border-gray-700 ">
                      <th
                        className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        scope="row"
                      >
                        {index + 1}
                      </th>
                      <td className="px-7 py-3">{data.code}</td>
                      <td className="px-7 py-3">
                        {new Date(data?.expiresAt).toLocaleDateString()}
                      </td>
                      <td className="px-7 py-3">{data.discountAmount}</td>
                      <td className="px-7 py-3">
                        {data.isActive ? (
                          <p className="text-green-500 font-semibold">True</p>
                        ) : (
                          <p className="text-red-600 font-semibold">False</p>
                        )}
                      </td>
                      <td className="px-7 py-3">
                        {data.uses_count ? data.uses_count : 0}
                      </td>
                      <td className="px-7 py-3">{data.total_limit}</td>
                      <td className="pl-0 pr-3 py-3 flex items-center justify-end gap-x-4">
                        <FaRegEdit
                          onClick={() => handleUpdateCoupon(data?.id)}
                          size={22}
                          className="text-blue-500 cursor-pointer"
                        />
                        <IoTrashOutline
                          onClick={() => handleDelete(data?.id)}
                          size={22}
                          className="text-red-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* UPDATE MODALS */}
          <CouponUpdateModal
            updatedCouponId={updatedCouponId}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </>
      )}
    </>
  );
};

export default CreateCoupon;
