import type { Price } from 'types/Price';
import type Location from 'interfaces/Location';

export default interface Property {
    image: string;
    title: string;
    price: Price;
    location: Location;
    contact: [ number, string];
    isAvailable: boolean;
}
