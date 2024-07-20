export interface IHotel {
    hotelId: number;
    name: string;
    address: string;
    zipCode: string;
    phoneNumber?: string | null;
    email?: string | null;
    website?: string | null;
    numberOfRooms: number;
    rating: number;
    amenities?: string | null;
    checkInTime?: string | null; 
    checkOutTime?: string | null; 
    imageUrl?: string | null;
    image?: File | null; 
}