import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


type Data = {
    price?: string,
    error?: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const options = {
        method: 'GET',
        url: 'https://taxi-fare-calculator.p.rapidapi.com/search-geo',
        params: {
            dep_lat: '49.8004820',
            dep_lng: '-97.1578097',
            arr_lat: '49.7999595',
            arr_lng: '-97.1636711'
        },
        headers: {
            'X-RapidAPI-Key': '157f6b80fdmshd549d4b7a464b3fp1eb334jsnac27933158eb',
            'X-RapidAPI-Host': 'taxi-fare-calculator.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.status(200).json({ price: response.data });

    } catch (error) {
        console.error(error);
    }
}