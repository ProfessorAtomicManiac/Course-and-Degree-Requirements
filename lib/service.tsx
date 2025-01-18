export async function getCourse(course: string) {
    const url = `/api/getCourse?course=${course}`;
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (e) {
        console.error(`Failed to get course: ${course}`, e)
        return null;
    }
}