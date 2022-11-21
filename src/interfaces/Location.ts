import type { Country } from "types/Country";

export default interface Location {
    firstLine: string;
    city: string;
    code: number | string;
    country: Country;
}
