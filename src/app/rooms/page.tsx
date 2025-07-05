'use client';

import PageHeading from "@/components/PageHeading";
import ActionButton from "@/components/ActionButton";
import Table from "@/components/Table";
import { Room } from "@/data/types/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSearch, faFilter, faUsers, faBuilding } from "@fortawesome/free-solid-svg-icons"; // More icons

import roomsData from "@/data/jsons/rooms.json";
import { useState, useEffect, ChangeEvent } from 'react';

// Simulate Room Types and Features (if not in your JSON)
const roomTypes = ['Classroom', 'Lab', 'Office', 'Meeting Room', 'Auditorium'];
const roomFeaturesList = ['Projector', 'Whiteboard', 'AC', 'Conference Call System', 'Smart Board', 'Sound System'];
const buildingsList = ['Main Building', 'Science Wing', 'Technology Center', 'Arts Block'];
const roomAvailabilities = ['Available', 'Occupied', 'Maintenance'];

const roomsWithExtras = roomsData.map(room => ({
    ...room,
    type: roomTypes[Math.floor(Math.random() * roomTypes.length)],
    features: roomFeaturesList.filter(() => Math.random() > 0.5), // Randomly assign features
    availability: roomAvailabilities[Math.floor(Math.random() * roomAvailabilities.length)],
    building: buildingsList[Math.floor(Math.random() * buildingsList.length)],
}));


export default function RoomsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roomTypeFilter, setRoomTypeFilter] = useState("");
    const [capacityFilter, setCapacityFilter] = useState(""); // Consider capacity ranges or exact values
    const [availabilityFilter, setAvailabilityFilter] = useState("");
    const [featuresFilter, setFeaturesFilter] = useState<string[]>([]); // For multi-select/checkbox filter
    const [buildingFilter, setBuildingFilter] = useState("");
    const [rooms, setRooms] = useState(roomsWithExtras); // Use roomsWithExtras with simulated data
    const [uniqueRoomTypes, setUniqueRoomTypes] = useState<string[]>([]);
    const [uniqueBuildings, setUniqueBuildings] = useState<string[]>([]);
    const [uniqueFeatures, setUniqueFeatures] = useState<string[]>([]);


    useEffect(() => {
        // Extract unique values for filters
        setUniqueRoomTypes(Array.from(new Set(roomsWithExtras.map(room => room.type))).sort());
        setUniqueBuildings(Array.from(new Set(roomsWithExtras.map(room => room.building))).sort());
        // Collect all features and get unique ones
        const allFeatures = roomsWithExtras.reduce((acc, room) => ([...acc, ...(room.features || [])]), [""]);
        setUniqueFeatures(Array.from(new Set(allFeatures)).sort());

    }, []);


    const handleAddRoomClick = () => {
        console.log("Add Room button clicked (modal would open in real app)");
    };

    const filterRooms = (roomsToFilter: Room[], query: string, type: string, capacity: string, availability: string, features: string[], building: string) => {
        return roomsToFilter.filter(room => {
            const searchMatch = room.name.toLowerCase().includes(query.toLowerCase());
            const typeMatch = type === "" || room.type === type;
            const capacityMatch = capacity === "" || room.capacity <= parseInt(capacity, 10); // Example: Filter rooms *at or below* capacity
            const availabilityMatch = availability === "" || room.availability === availability;
            const buildingMatch = building === "" || room.building === building;
            const featuresMatch = features.length === 0 || features.every(feature => room.features.includes(feature)); // Check if room has *all* selected features

            return searchMatch && typeMatch && capacityMatch && availabilityMatch && featuresMatch && buildingMatch;
        });
    };


    const debouncedSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const filtered = filterRooms(roomsWithExtras, searchQuery, roomTypeFilter, capacityFilter, availabilityFilter, featuresFilter, buildingFilter);
            setRooms(filtered);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, roomTypeFilter, capacityFilter, availabilityFilter, featuresFilter, buildingFilter]); // Add all filters to dependencies


    const handleRoomTypeFilterChange = (e: ChangeEvent) => setRoomTypeFilter((e.target as HTMLInputElement).value);
    const handleCapacityFilterChange = (e: ChangeEvent) => setCapacityFilter((e.target as HTMLInputElement).value);
    const handleAvailabilityFilterChange = (e: ChangeEvent) => setAvailabilityFilter((e.target as HTMLInputElement).value);
    const handleBuildingFilterChange = (e: ChangeEvent) => setBuildingFilter((e.target as HTMLInputElement).value);
    const handleFeaturesFilterChange = (feature: string, isChecked: boolean) => { // For multi-select checkboxes
        if (isChecked) {
            setFeaturesFilter([...featuresFilter, feature]);
        } else {
            setFeaturesFilter(featuresFilter.filter(f => f !== feature));
        }
    };


    return (
        <section className="  mx-auto py-12 px-6 md:px-8 lg:px-12 space-y-8">
            <PageHeading
                title="Room Management System" // More descriptive title
                description="Manage and allocate rooms effectively. Filter and search to find the perfect space." // Enhanced description
            />

            {/* Filters Section - Expanded */}
            <div className="bg-card-background p-6 rounded-xl shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6"> {/* 1. Increased Grid Columns */}
                    <div>
                        <label htmlFor="room-search" className="block text-sm font-medium text-foreground/80 mb-2">Search Rooms</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-foreground/60" />
                            </div>
                            <input
                                type="text"
                                name="room-search"
                                id="room-search"
                                className="block w-full pl-10 pr-3 py-2 border border-border-color rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-background"
                                placeholder="Search room name..."
                                value={searchQuery}
                                onChange={(e) => debouncedSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="type-filter" className="block text-sm font-medium text-foreground/80 mb-2">Filter by Type</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <FontAwesomeIcon icon={faFilter} className="h-5 w-5 text-foreground/60" />
                            </div>
                            <select
                                id="type-filter"
                                name="type-filter"
                                className="block w-full pl-10 pr-3 py-2 border border-border-color rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none bg-background"
                                value={roomTypeFilter}
                                onChange={handleRoomTypeFilterChange}
                            >
                                <option value="">All Types</option>
                                {uniqueRoomTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/80">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="capacity-filter" className="block text-sm font-medium text-foreground/80 mb-2">Max Capacity</label> {/* Changed label */}
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-foreground/60" /> {/* Capacity Icon */}
                            </div>
                            <select
                                id="capacity-filter"
                                name="capacity-filter"
                                className="block w-full pl-10 pr-3 py-2 border border-border-color rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none bg-background"
                                value={capacityFilter}
                                onChange={handleCapacityFilterChange}
                            >
                                <option value="">Any Capacity</option> {/* Changed default option */}
                                <option value="10">Up to 10 Seats</option>
                                <option value="25">Up to 25 Seats</option>
                                <option value="50">Up to 50 Seats</option>
                                <option value="100">Up to 100 Seats</option>
                                <option value="200">Up to 200 Seats</option>
                                {/* Add more capacity ranges as needed */}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/80">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="availability-filter" className="block text-sm font-medium text-foreground/80 mb-2">Availability</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <FontAwesomeIcon icon={faFilter} className="h-5 w-5 text-foreground/60" />
                            </div>
                            <select
                                id="availability-filter"
                                name="availability-filter"
                                className="block w-full pl-10 pr-3 py-2 border border-border-color rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none bg-background"
                                value={availabilityFilter}
                                onChange={handleAvailabilityFilterChange}
                            >
                                <option value="">All</option>
                                {roomAvailabilities.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/80">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">Features</label>
                        <div className="space-y-1"> {/* Vertical spacing for checkboxes */}
                            {uniqueFeatures.map((feature) => (
                                <div key={feature} className="flex items-center">
                                    <input
                                        id={`feature-${feature}`}
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-primary-500 focus:ring-primary-500 border-border-color rounded"
                                        checked={featuresFilter.includes(feature)}
                                        onChange={(e) => handleFeaturesFilterChange(feature, e.target.checked)}
                                    />
                                    <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-foreground/80">{feature}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="building-filter" className="block text-sm font-medium text-foreground/80 mb-2">Building</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <FontAwesomeIcon icon={faBuilding} className="h-5 w-5 text-foreground/60" />
                            </div>
                            <select
                                id="building-filter"
                                name="building-filter"
                                className="block w-full pl-10 pr-3 py-2 border border-border-color rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none bg-background"
                                value={buildingFilter}
                                onChange={handleBuildingFilterChange}
                            >
                                <option value="">All Buildings</option>
                                {uniqueBuildings.map((building) => (
                                    <option key={building} value={building}>{building}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/80">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


            <div className="flex justify-between items-center mb-6">
                <div>{/* Left side - can be used for bulk actions or info later */}</div>
                <ActionButton
                    onClick={handleAddRoomClick}
                    icon={<FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5" />}
                    label="Add Room"
                    variant="primary"
                />
            </div>

            <div className="bg-card-background rounded-xl shadow-lg overflow-hidden border border-border-color">
                <Table
                    headers={['No.', 'Name', 'Type', 'Capacity', 'Availability', 'Features', 'Building', 'Actions']} // 2. Added more headers
                    rows={rooms.map((room, index) => ({
                        no: index + 1,
                        name: room.name,
                        type: room.type, // 3. Display Room Type
                        capacity: room.capacity,
                        availability: ( // 4. Availability with visual indicator
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${room.availability === 'Available' ? 'bg-green-500/10 text-green-500' : room.availability === 'Occupied' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                <span className={`w-2.5 h-2.5 mr-1 rounded-full ${room.availability === 'Available' ? 'bg-green-500' : room.availability === 'Occupied' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                {room.availability}
                            </span>
                        ),
                        features: ( // 5. Display Features - comma-separated list
                            room.features.length > 0 ? room.features.join(', ') : 'None'
                        ),
                        building: room.building, // 6. Display Building
                        actions: ( // 7. Action Buttons
                            <div className="flex justify-center space-x-2">
                                <ActionButton label="Edit" variant="secondary" size="small" />
                                <ActionButton label="Delete" variant="danger" size="small" />
                            </div>
                        ),
                    }))}
                    emptyMessage="No rooms found matching your criteria. Click 'Add Room' to create one."
                    striped
                    roundedCorners={false}
                />
            </div>

            {/* Modal - Keep commented out for now */}
        </section>
    );
}
