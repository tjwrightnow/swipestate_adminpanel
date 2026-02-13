import { getCookie } from "cookies-next";

export const cookiesData = getCookie("swipeestate") ? JSON?.parse(getCookie("swipeestate") as string) : undefined;
export const Token = cookiesData?.data?.accessToken;
export const RefreshToken = cookiesData?.data?.refreshToken;
export const UserData = cookiesData?.data?.user;
