import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { course } = req.query;
    const courses = await fetch("./courses.json");
    const courseData = (courses as any)[(course as string)];
    res.status(200).json(courseData);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Error fetching course' });
  }
}