import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const ItemsPurchasedByCompanyList = () => {
  const [items, setItems] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, persist } = useAuth();
  
  let company = auth?.company;
  console.log(company)
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();


    const getItems = async () => {
      try {
        const response = await axiosPrivate.get("/purchasedItems", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setItems(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h3>Approved Transactions</h3>
      <br />
      {items?.length ? (
        <ul>
          {items.map((item, i) => {
            if(item?.purchaseApproved && item?.companyName === company){
                return(
                    <li key={i}>
                      Item: {item?.itemName}
                      <br />
                      Price: {item?.price}$
                      <br />
                      Quantity: {item?.quantity}
                      <br />
                      Supplier: {item?.supplierName}
                      <br />
                      Total: {item?.price*item?.quantity}$
                      <br />
                      <br />
                    </li>
                  )
            }
          })}
        </ul>
      ) : (
        <p>No item requests to display</p>
      )}
    </article>
  );
};

export default ItemsPurchasedByCompanyList;
