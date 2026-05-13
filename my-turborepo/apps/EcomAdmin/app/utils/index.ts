function getFormattedCreationDate(dateString:any) {
    // Create a new Date instance from the input
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    // Returns a readable string based on user's local settings
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
export default getFormattedCreationDate