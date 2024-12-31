const axios = require('axios');
const mongoose = require('mongoose');
const Location = require('../models/LocationModel');
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';

// Function to fetch geocode data from Google Maps API
const getGeocodeData = async (location) => {
    console.log('Fetching geocode data for:', location);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK' && data.results.length > 0) {
            const result = data.results[0];
            const addressComponents = result.address_components;

            let country, state, city, postalCode;
            let latitude = result.geometry.location.lat;
            let longitude = result.geometry.location.lng;

            // Extract relevant components from the geocode data
            addressComponents.forEach((component) => {
                if (component.types.includes('country')) country = component.long_name;
                if (component.types.includes('administrative_area_level_1')) state = component.long_name;
                if (component.types.includes('locality')) city = component.long_name;
                if (component.types.includes('postal_code')) postalCode = component.long_name;
            });

            return {
                country,
                state,
                city,
                postalCode,
                latitude,
                longitude,
            };
        } else {
            throw new Error('No results found for the location.');
        }
    } catch (error) {
        console.error('Error fetching geocode data:', error.message);
        throw new Error('Failed to fetch geocode data.');
    }
};

// Function to save a location
const saveLocation = async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body

    const locationData = req.body;
    
    try {
        const user = req.user; 
        console.log(req.user);
        if (!user) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        console.log('Location data:', locationData.location);
        const locationDetails = await getGeocodeData(locationData.location); // Fetch geocode data

        console.log('Location details:', locationDetails);

        // Create a new location object
        const location = new Location({
            name: locationData.name || 'Unnamed Location',
            address: {
                street: locationData.houseNumber + ' ' + locationData.area,
                city: locationDetails.city,
                state: locationDetails.state,
                country: locationDetails.country,
            },
            latitude: locationDetails.latitude,
            longitude: locationDetails.longitude,
            addressType: locationData.addressType,
            user: req.user._id,
        });

        
        await location.save();
        console.log('Location saved successfully!');
        return res.status(202).json({ message: 'Location saved successfully!' });
    } catch (error) {
        console.error('Error saving location:', error);
        return res.status(500).json({ message: 'Error saving location' });
    }
};

// Function to fetch all locations by user
const getAllLocationsByUser = async (req, res) => {
    try {
        const userId = req.user._id; 

        if (!userId) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        const locations = await Location.find({ user: userId });

        if (locations.length === 0) {
            return res.status(404).json({ message: 'No locations found for this user' });
        }

        return res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        return res.status(500).json({ message: 'Error fetching locations' });
    }
};

module.exports = { saveLocation, getAllLocationsByUser };
