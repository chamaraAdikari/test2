import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
    try {
        if (!req.body.expiresAt) {
            return res.status(400).json({ message: "Expiration date is required" });
        }

        // Validate expiration date
        const expiresAt = new Date(req.body.expiresAt);
        if (isNaN(expiresAt.getTime())) {
            return res.status(400).json({ message: "Invalid expiration date" });
        }

        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch(err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try{
       const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
       res.status(200).json(updatedHotel);
    }catch(err){
           next(err);
       }
}


export const deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Delete all associated rooms first
        if (hotel.rooms && hotel.rooms.length > 0) {
            await Promise.all(
                hotel.rooms.map(async (roomId) => {
                    try {
                        await Room.findByIdAndDelete(roomId);
                    } catch (err) {
                        console.error(`Error deleting room ${roomId}:`, err);
                    }
                })
            );
        }

        // Delete the hotel
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Hotel and associated rooms have been deleted." });
    } catch (err) {
        next(err);
    }
}


export const getHotel = async (req, res, next) => {
try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json(hotel);
    } catch(err) {
           next(err);
       }
}


export const getHotels = async (req, res, next) => {
    try {
        const { min, max, ...others } = req.query;

        // Add condition to only return non-expired hotels
        const currentTime = new Date();
        const baseQuery = {
            ...others,
            expiresAt: { $gt: currentTime }
        };

        // Add price range if specified
        if (min || max) {
            baseQuery.cheapestPrice = {};
            if (min) baseQuery.cheapestPrice.$gt = parseInt(min);
            if (max) baseQuery.cheapestPrice.$lt = parseInt(max);
        }

        const hotels = await Hotel.find(baseQuery).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch(err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try{
          const list = await Promise.all(cities.map(city => {
              return Hotel.countDocuments({city:city});
          }));
          res.status(200).json(list);
       }catch(err){
             next(err);
         }
  }


export const countByType = async (req, res, next) => {
    try {
        const HotelCount = await Hotel.countDocuments({type:"Hotel"});
        const ApartmentCount = await Hotel.countDocuments({type:"Apartment"});
        const ResortCount = await Hotel.countDocuments({type:"Resort"});
        const VillaCount = await Hotel.countDocuments({type:"Villa"});
        const HomeStayCount = await Hotel.countDocuments({type:"HomeStay"});
        
        res.status(200).json([
            {type: "Hotels", count: HotelCount},
            {type: "Apartments", count: ApartmentCount},
            {type: "Resorts", count: ResortCount},
            {type: "Villas", count: VillaCount},
            {type: "HomeStays", count: HomeStayCount}
        ]);
    } catch(err) {
        next(err);
    }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const roomsList = await Promise.all(
      hotel.rooms.map((roomId) => {
        return Room.findById(roomId);
      })
    );

    res.status(200).json(roomsList);
  } catch (err) {
    next(err);
  }
};

// Cleanup function for expired hotels (backup for TTL index)
export const cleanupExpiredHotels = async () => {
    try {
        const currentTime = new Date();
        const result = await Hotel.deleteMany({
            expiresAt: { $lte: currentTime }
        });
        console.log(`Cleaned up ${result.deletedCount} expired hotels`);
    } catch (err) {
        console.error("Error cleaning up expired hotels:", err);
    }
};