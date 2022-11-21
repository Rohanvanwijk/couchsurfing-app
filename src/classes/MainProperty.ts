import type Review from "interfaces/Review";

export default class MainProperty {
    image: string
    title: string
    reviews: Review[]

    constructor(image: string, title: string, reviews: Review[]) {
        this.image = image;
        this.title = title;
        this.reviews = reviews;
    }
}
