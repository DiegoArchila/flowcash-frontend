export const formatUUID = {
    getUUIDShort: (uuid) => {
        if (!uuid || typeof uuid !== 'string' || uuid.length < 8) {
            return "Invalid UUID";
        }
        return uuid.substring(0, 8);;
    }
};
