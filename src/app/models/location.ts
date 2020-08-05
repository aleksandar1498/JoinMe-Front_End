import { LocationCategory } from './enums/location-category';

export class Location {
    public id: string;
    public city: string;
    public name: string;
    public locationCategory: LocationCategory;

    constructor(
        id: string,
        city: string,
        name: string,
        locationCategory: LocationCategory) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.locationCategory = locationCategory;
    }
    toString() {
        return this.city + " " + this.name;
    }
}
