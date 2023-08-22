import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosFetch from './../../hooks/useAxiosFetch';

const PopularProducts = () => {
    const axiosFetch = useAxiosFetch();
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axiosFetch.get('/popular_products');
            setProducts(response?.data);
        };
        fetchProducts();
    },[])

    return (
        <div className='md:w-[80%] mx-auto my-36'>
            <div className="">
                <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Popular</span> Products</h1>
                <div className="w-[40%] text-center mx-auto my-4">
                    <p className='text-gray-500'>Explore our Popular Products .</p>
                </div>
            </div>


        <div className="grid  md:grid-cols-2 lg:grid-cols-3">
            {
                products.map((item, index) =>     <motion.div
                className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.img
                  loading='lazy'
                  className="h-48 w-full object-cover"
                  src={item?.image}
                  alt={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <div className="p-4">
                  <motion.h2
                    className="text-xl font-semibold mb-2 dark:text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {item?.name}
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Available Quantity: {item?.availableQuantity}
                  </motion.p>
                  <motion.p
                    className="text-gray-600 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Price: {item?.price}
                  </motion.p>
                  <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Total Sell: {item?.totalSell}
                  </motion.p>
                </div>
              </motion.div>)
            }
        </div>

        </div>
    );
};

export default PopularProducts;