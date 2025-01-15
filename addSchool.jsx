import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddSchool() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const response = await axios.post('/api/schools', data);
            alert(response.data.message);
        } catch (error) {
            alert('Error adding school: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add a School</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input {...register('name', { required: 'Name is required' })} className="w-full border p-2 rounded" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input {...register('address', { required: 'Address is required' })} className="w-full border p-2 rounded" />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">City</label>
                    <input {...register('city', { required: 'City is required' })} className="w-full border p-2 rounded" />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">State</label>
                    <input {...register('state', { required: 'State is required' })} className="w-full border p-2 rounded" />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Contact</label>
                    <input type="number" {...register('contact', { required: 'Contact is required', minLength: 10, maxLength: 10 })} className="w-full border p-2 rounded" />
                    {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" {...register('email_id', { required: 'Email is required' })} className="w-full border p-2 rounded" />
                    {errors.email_id && <p className="text-red-500 text-sm">{errors.email_id.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Image</label>
                    <input type="file" {...register('image', { required: 'Image is required' })} className="w-full border p-2 rounded" />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
        </div>
    );
}
