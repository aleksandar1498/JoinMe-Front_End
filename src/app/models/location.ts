import { LocationCategory } from './enums/location-category';

export class Location {
    public id: string;
    public city: string;
    public address: string;
    public locationCategory: LocationCategory;

    constructor(
        id: string,
        city: string,
        address: string,
        locationCategory: LocationCategory) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.locationCategory = locationCategory;
    }
    toString() {
        return this.city + " " + this.address;
    }
}
