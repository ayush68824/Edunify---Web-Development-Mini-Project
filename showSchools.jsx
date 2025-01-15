import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('/api/schools');
                setSchools(response.data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">School List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {schools.map((school) => (
                    <div key={school.id} className="border rounded p-4">
                        <img src={`/schoolImages/${school.image}`} alt={school.name} className="w-full h-32 object-cover rounded mb-2" />
                        <h2 className="text-xl font-bold">{school.name}</h2>
                        <p>{school.address}</p>
                        <p>{school.city}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
