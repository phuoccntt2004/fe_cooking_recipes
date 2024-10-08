import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient";


class FavouriteAPI {
    HandleFavourite = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/favourite${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const favouriteAPI = new FavouriteAPI()

export default favouriteAPI;