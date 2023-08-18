
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Table, { Row } from "../../components/reusable/Table";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyCart = () => {
  const { user } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/my-cart?email=${user?.email}`).then((data) => {
      setCartData(data?.data[0].documents);
    });
  }, [user, axiosSecure]);
  const cols = [
    { label: "Purchased By", value: "purchased By" },
    { label: "Product", value: "Product" },
    { label: "Price", value: "Price" },
    { label: "Actions", value: "Actions" },
  ];
  return (
    <Table cols={cols}>
      {cartData?.map((singleProduct) => (
        <Row key={singleProduct._id}>
          <td className="py-3 px-6 text-left ">
            <div className="flex items-center ">
              <span className="font-medium">{singleProduct.purchasedBy}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left ">
            <div className="flex items-center ">
              <span className="font-medium">{singleProduct.model}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left ">
            <div className="flex items-center ">
              <span className="font-medium">{singleProduct.price} Taka</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left ">
            <div className="flex items-center ">
              <span className="font-medium"> Actions</span>
            </div>
          </td>
        </Row>
      ))}
    </Table>
  );
};

export default MyCart;
