import { axiosInstance } from "../config/axiosInstance";

export let getProductsApi = async () => {
  try {
    console.log("api call function running..");
    let res = await axiosInstance.get("/products");
    return res.data.products;
  } catch (error) {
    console.log("error in products api", error);
  }
};
