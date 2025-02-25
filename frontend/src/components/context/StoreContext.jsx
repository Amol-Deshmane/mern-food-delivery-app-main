import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // ✅ Function to add items to cart
    const addToCart = async (dishId) => {
        setCartItems((prev) => ({
            ...prev,
            [dishId]: (prev[dishId] || 0) + 1,
        }));

        if (token) {
            await axios.post(url + "/api/cart/add", { dishId }, { headers: { token } });
        }
    };

    // ✅ Function to remove items from cart
    const removeFromCart = (dishId) => {
        setCartItems((prev) => {
            if (!prev[dishId]) return prev;
            const updatedCart = { ...prev };
            updatedCart[dishId] -= 1;
            if (updatedCart[dishId] === 0) {
                delete updatedCart[dishId];
            }
            return updatedCart;
        });
    };

    // ✅ Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // ✅ Fetch food list from backend
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    // ✅ Load cart data when app starts
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    return (
        <StoreContext.Provider value={{ food_list, cartItems, addToCart, removeFromCart, getTotalCartAmount, url, token, setToken }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
