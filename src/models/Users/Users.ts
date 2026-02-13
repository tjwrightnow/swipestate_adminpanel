import {ShowErrorToast} from "@/components/Toast/Toast";
import {useGetBuyersQuery, useGetSellersQuery} from "@/redux/Users/User";

export const useGetBuyerHandler = ({page}: {page: number}) => {
	const buyer = useGetBuyersQuery({page});

	const BuyerData = buyer?.data;
	const BuyerLoading = buyer.isLoading;
	const {isError, error, refetch} = buyer;

	if (isError) {
		ShowErrorToast("Failed to fetch Buyers Details");
	}

	return {
		BuyerData,
		BuyerLoading,
		isError,
		error,
		refetch,
	};
};

export const useGetSellerHandler = ({page}: {page: number}) => {
	const seller = useGetSellersQuery({page});

	const SellerData = seller?.data;
	const SellerLoading = seller.isLoading;
	const {isError, error, refetch} = seller;

	if (isError) {
		ShowErrorToast("Failed to fetch Sellers Details");
	}

	return {
		SellerData,
		SellerLoading,
		isError,
		error,
		refetch,
	};
};
