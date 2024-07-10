export const INITIAL_STATE = {
    trips: [],
    selectedTrip: null,
    isLoading: false,
    setSelectedTrip: () => {},
    fetchTrips: async () => {},
    addTrip: async () => {},
    modifyTrip: async () => {},
    removeTrip: async () => {},
    markTripAsCompleted: async () => {},
    moveTripToUpcoming: async () => {},
    create: {
        showCreate: false,
        handleOpenCreate: () => {},
        handleCloseCreate: () => {},
    },
}
