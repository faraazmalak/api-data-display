/**
 * Data Store, where all the API data is stored
 */
export function createDataStore() {
  return {
    data: [],
    nextPage: 1,
    currentPage: null,
    totalPages: null,
    promise: null,
  };
}
