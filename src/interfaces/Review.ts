import type LoyaltyUser from "enums/LoyaltyUser";

export default interface Review {
    name: string; 
    stars: number; 
    loyaltyUser: LoyaltyUser; 
    date: string;   
}
