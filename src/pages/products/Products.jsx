import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../utilities/providers/AuthProvider";
const Products = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [orderedProducts, setOrderedProducts] = useState([]);
const {setControl,control} = useContext(AuthContext)
  const handleHover = (index) => {
    setHoveredCard(index);
  };

  const [products, setProducts] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosFetch
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handelSelect = (id) => {
    axiosSecure
      .get(`/ordered-products/${currentUser?.email}`)
      .then((res) => {
        setOrderedProducts(res.data)
        setControl(!control)
      })
      .catch((err) => console.log(err));
    if (!currentUser) {
      return toast.error("Please Login First");
    }
    axiosSecure
      .get(`/cart-item/${id}?email=${currentUser.email}`)
      .then((res) => {
        // if (res.data.productId === id) {
        //   return toast.error("Already Selected");
        // } else if (orderedProducts.find((item) => item.products._id === id)) {
        //   return toast.error("Already Selected");
        // } 
        // else {
          const data = {
            productId: id,
            userMail: currentUser.email,
            date: new Date(),
          };

          toast.promise(
            axiosSecure.post("/add-to-cart", data).then((res) => {
              console.log(res.data);
            }),

            {
              pending: "Selecting...",
              success: {
                render({ data }) {
                  return `Selected Successfully`;
                },
              },
              error: {
                render({ data }) {
                  return `Error: ${data.message}`;
                },
              },
            }
          );
        // }
      });
  };

  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-dark-primary">
          Products
        </h1>
      </div>

      <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
        {products.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:-translate-y-2  duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-80 mx-auto ${
              cls.availableQuantity < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="relative h-48">
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                  hoveredCard === index ? "opacity-60" : ""
                }`}
              />
              <img
                src={cls.image}
                alt="Course Image"
                className="object-cover w-full h-full"
              />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handelSelect(cls._id)}
                    title={
                      role === "admin" || role === "seller"
                        ? "Seller/Admin Can not be able to select "
                          ? cls.availableQuantity < 1
                          : "No seat avalible"
                        : "You can select this classes"
                    }
                    disabled={
                      role === "admin" ||
                      role === "seller" ||
                      cls.availableQuantity < 1
                    }
                    className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700"
                  >
                    Select
                  </button>
                </div>
              </Transition>
            </div>
            <div className="px-6 py-2">
              <h3
                className={`${
                  cls.name.length > 25 ? "text-[14px]" : "text-[16px]"
                }  font-bold`}
              >
                {cls.name}
              </h3>
              <p className="text-gray-500 text-xs">Seller : {cls.sellerName}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-xs">
                  Available Quantity:{" "}
                  <span className="text-secondary">
                    {cls.availableQuantity}
                  </span>{" "}
                </span>
                <span className="text-green-500 font-semibold">
                  ${cls.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
