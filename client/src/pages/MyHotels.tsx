import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

type Hotel = {
  _id: string;
  name: string;
  phone: string;
  description: string;
  city: string;
  country: string;
  type: string;
  pricePerNight: number;
  adultCount: number;
  childCount: number;
  starRating: number;
};

const MyHotels = () => {
  const { data: hotelData, isLoading, isError } = useQuery<Hotel[]>(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {
        console.error("Failed to fetch hotels");
      },
    }
  );

  const { mutate: deleteHotel } = useMutation(apiClient.deleteMyHotelById, {
    onSuccess: () => {
      console.log("Hotel deleted successfully");
      window.location.reload(); // Reload the page
    },
    onError: (error: Error) => {
      console.error("Error deleting hotel:", error.message);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      deleteHotel(id);
    }
  };

  if (isLoading) {
    return <span>Loading hotels...</span>;
  }

  if (isError || !hotelData?.length) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <p className="whitespace-pre-line">{hotel.phone}</p>
            <p className="whitespace-pre-line">{hotel.description}</p>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(hotel._id)}
                className="font-bold p-2 text-white text-xl bg-red-600 hover:bg-red-500"
              >
                Delete
              </button>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
