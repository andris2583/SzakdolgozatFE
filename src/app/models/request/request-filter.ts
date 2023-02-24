export interface RequestFilter {
    nameFilterString: string | null;
    maxCount: number | null;
    ownerId: string | null;
    fromDate: Date | null;
    toDate: Date | null;
    latitude: number | null;
    longitude: number | null;
    distance: number | null;
}
