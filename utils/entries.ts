// Helper function to split and normalize divisions
export const splitDivisions = (divisions: string): string[] => {
    if (!divisions) return [];
    return divisions
        .split(",")
        .map((division) => division.trim())
        .filter((division) => division); // Remove any empty strings
};

