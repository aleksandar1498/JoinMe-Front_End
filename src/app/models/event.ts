import { User } from './user';
import { Location } from './location';
import { EventCategory } from './enums/event-category';

export class Event {
    id: string;
    title: string;
    location: Location;
    category: EventCategory;
    description: string;
    startDate: Date;
    endDate: Date;
    joinedUsers: string[];
    cancelled: boolean;
    banned: boolean;
    owner: User;
    interestedUsers: string[];

    constructor(
        id: string,
        title: string,
        location: Location,
        category: EventCategory,
        description: string,
        cancelled: boolean,
        banned: boolean,
        startDate: Date,
        endDate: Date, owner: User = null, joinedUsers: string[], interestedUsers: string[]) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.cancelled = cancelled;
        this.banned = banned;
        this.owner = owner;
        this.joinedUsers = joinedUsers;
        this.interestedUsers = interestedUsers;
    }
}