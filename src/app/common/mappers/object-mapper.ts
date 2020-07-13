import { Event } from 'src/app/models/event';

const eventMapper = (res: Event[]) => {
    return res.filter(e => {
        return !e.cancelled;
    }).map(ev => {
        ev.joinedUsers = ev.joinedUsers.map(u => {
            return u['user']['username'];
        });
        ev.interestedUsers = ev.interestedUsers.map(u => {
            return u['user']['username'];
        });
        return ev;
    });
}

export { eventMapper };