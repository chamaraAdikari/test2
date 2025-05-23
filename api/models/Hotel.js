import mongoose from "mongoose"
const { Schema } = mongoose

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    whatsappNumber: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // This creates a TTL index that will automatically delete documents when expiresAt is reached
    },
    photos: {
        type: [String],
        required: false,
        default: []
    },
    desc: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 8,
    },
    amenities: {
        type: [{
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            enabled: {
                type: Boolean,
                default: false
            }
        }],
        default: [
            { name: "TV", icon: "📺", enabled: false },
            { name: "Pool", icon: "🏊", enabled: false },
            { name: "Wi-Fi", icon: "📶", enabled: false },
            { name: "Air Conditioning", icon: "❄️", enabled: false },
            { name: "Gym", icon: "🏋️‍♂️", enabled: false },
            { name: "Spa", icon: "🧖‍♀️", enabled: false },
            { name: "Parking", icon: "🚗", enabled: false },
            { name: "Pet Friendly", icon: "🐶", enabled: false },
            { name: "Restaurant", icon: "🍽️", enabled: false },
            { name: "Bar", icon: "🍷", enabled: false },
            { name: "Laundry", icon: "🧺", enabled: false },
            { name: "Room Service", icon: "🛎️", enabled: false },
            { name: "Wheelchair Access", icon: "♿", enabled: false },
            { name: "24/7 Reception", icon: "🕐", enabled: false },
            { name: "Non-Smoking", icon: "🚭", enabled: false }
        ]
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model("Hotel", HotelSchema)