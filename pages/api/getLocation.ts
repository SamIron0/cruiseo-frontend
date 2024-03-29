import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


type Data = {
    location?: Geolocation,
    error?: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // get IP address of client
        const response = await axios.get(
            `http://api.ipapi.com/${ip}?access_key=${process.env.IPAPI_API_KEY}`,
        );
        res.status(200).json({ location: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
}
