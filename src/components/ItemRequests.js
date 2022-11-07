import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const ItemRequests = () => {
    const [itemRequests, setItemRequests] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getItemRequests = async () => {
            try {
                const response = await axiosPrivate.get('/itemRequests', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setItemRequests(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getItemRequests();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Requested Quotes</h2>
            {itemRequests?.length
                ? (
                    <ul>
                        {itemRequests.map((itemRequest, i) => <li key={i}>{itemRequest?.itemName}</li>)}
                    </ul>
                ) : <p>No item requests to display</p>
            }
        </article>
    );
};

export default ItemRequests;