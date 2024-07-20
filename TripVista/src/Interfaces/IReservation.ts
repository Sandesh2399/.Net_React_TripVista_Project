export interface IReservation {
    reservationId : number
    userId: number
    hotelId: number
    userName: string
    userEmail: string
    destinationId : number
    destination : string
    packageId : number
    packageName : string
    reservationDate : string
    startDate: string 
    endDate: string
    status : string
    totalPrice : number
    noOfPeople: number
}