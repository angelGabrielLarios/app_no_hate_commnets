export function generateUniqueId() {
    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime();

    // Generate a random number between 0 and 1000 for variability
    const random = Math.floor(Math.random() * 1000);

    // Concatenate the timestamp and random number to form the unique ID
    const uniqueId = `${timestamp}-${random}`;

    return uniqueId;
}