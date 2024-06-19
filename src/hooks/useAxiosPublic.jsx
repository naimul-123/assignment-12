import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://assignment12-category-0012-server.vercel.app',
    headers: { 'Content-Type': 'application/json' }
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;