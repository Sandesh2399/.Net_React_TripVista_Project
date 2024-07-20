export interface IPackageBox {
    destinationId:number,
    packageId: number,
    destination: string,
    packageName: string,
    description: string,
    price: number,
    imageUrl: string,
    durationDays: number,
    hotelDetails: HotelDetails
}

interface HotelDetails {
    hotelID : number,
    name : string,
    address : string,
    zipCode : string,
    email : string,
    numberOfRooms : string,
    phoneNumber : string,
    rating : string,
    amenities : string,
    imageUrl : string,
    website : string,
}
