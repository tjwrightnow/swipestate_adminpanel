import { ShowErrorToast, ShowSuccessToast } from "@/components/Toast/Toast";
import { useGetApartmentsQuery, useUpdateApartmentsMutation } from "@/redux/Apartment/ApartmentSlice";

export const useGetApartmentHandler = ({ page }: { page: number }) => {
   const apartment = useGetApartmentsQuery({ page });

   const ApartmentData = apartment?.data;
   const ApartmentLoading = apartment.isLoading;
   const { isError, error, refetch } = apartment;

   if (isError) {
      ShowErrorToast("Failed to fetch Apartments Details");
   }

   return {
      ApartmentData,
      ApartmentLoading,
      isError,
      error,
      refetch,
   };
};

export const useUpdateApartmentHandler = () => {
   const [updateApartmentAPI, { isLoading, isError }] = useUpdateApartmentsMutation();

   const handleUpdateApartment = async ({ propertyId, sellerId, status }: { propertyId: string; sellerId: string; status: string }) => {
      try {
         const res = await updateApartmentAPI({ propertyId, sellerId, data: { status } });
         if (!res.error) {
            ShowSuccessToast("Status Updated Successfully");
         } else {
            ShowErrorToast("Something went wrong");
         }
      } catch (error) {}
   };

   return {
      handleUpdateApartment,
      isLoading,
      isError,
   };
};
