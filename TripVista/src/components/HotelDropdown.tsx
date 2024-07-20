import { IHotel } from "../Interfaces/IHotel";
import { useEffect, useState } from "react";

interface Props {
    hotelId: number;
    hotels: IHotel[];
    onSelectHotel: (selectedHotel: IHotel) => void;
}

function HotelDropdown({ hotelId, hotels, onSelectHotel }: Props) {
    const [selectedHotel, setSelectedHotel] = useState<IHotel | null>(null);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const hotel = hotels.find(h => h.hotelId == hotelId);
        setSelectedHotel(hotel ?? null);
    }, [hotelId,hotels]);

    const handleSelect = (hotel: IHotel) => {
        setSelectedHotel(hotel);
        onSelectHotel(hotel);
        setShowOptions(false);
    };

    return (
        <div className="custom-hotel-dropdown">
            <div className="form-select custom-hotel-dropdown__selected" onClick={() => setShowOptions(!showOptions)}>
                {selectedHotel ? (
                    <div className="custom-hotel-dropdown__option">
                        <img src={selectedHotel.imageUrl ?? ''} alt={selectedHotel.name} />
                        <div>
                            <div className="name">{selectedHotel.name}</div>
                            <div className="address">{selectedHotel.address}</div>
                            <div className="rating">Rating: {selectedHotel.rating}</div>
                        </div>
                    </div>
                ) : (
                    <div>Select Hotel</div>
                )}
            </div>
            {showOptions && (
                <div className={`custom-hotel-dropdown__options ${hotels.length > 2 ? 'scrollable' : ''}`}>
                    {hotels.length > 0 ? (
                        hotels.map((hotel) => (
                            <div
                                key={hotel.hotelId}
                                className="custom-hotel-dropdown__option"
                                onClick={() => handleSelect(hotel)}
                            >
                                <img src={hotel.imageUrl ?? ''} alt={hotel.name} />
                                <div>
                                    <div className="name">{hotel.name}</div>
                                    <div className="address">{hotel.address}</div>
                                    <div className="rating">Rating: {hotel.rating}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="custom-hotel-dropdown__option">No Data</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default HotelDropdown;
