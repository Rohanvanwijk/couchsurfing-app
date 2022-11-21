import LoyaltyUser from "enums/LoyaltyUser";
import type Review from "interfaces/Review";
import Permissions from "enums/Permissions";
import type Property from "interfaces/Property";
import type User from "interfaces/User";
import axios from "axios";
import type Joke from "interfaces/Joke";

const reviewTotalDisplay = document.querySelector('#reviews');
const returningUserDisplay = document.querySelector('#returning-user');
const userNameDisplay = document.querySelector('#user');
const reviewContainerElement = document.querySelector('.js-review-container');
const showReviewButton = document.querySelector('.js-show-reviews-button');
const imageContainerElement = document.querySelector('.js-image-container');
const propertiesContainerElement = document.querySelector('.js-properties-container');
const jokesContainerElement = document.querySelector('.js-jokes-container');

export function populateUser(isReturning : boolean, userName: string, permission: Permissions ): void {
  if (!userNameDisplay) {
    return;
  }
  if (isReturning == true && returningUserDisplay) {
      returningUserDisplay.innerHTML = 'back';
  }
  userNameDisplay.innerHTML = `${userName} ${ permission === Permissions.ADMIN ? '👻' : '' }`;
}

export function showReviewTotal(total: number, reviewerName: string, isLoyalty: LoyaltyUser): void {
  const iconDisplay = LoyaltyUser.GOLD_USER ? '⭐' : '';
  if (!reviewTotalDisplay) {
    return;
  }
  reviewTotalDisplay.innerHTML = `${total.toString()} review${makeMultiple(total)} | last reviewed by ${reviewerName} ${iconDisplay}`;
}

export function makeMultiple(value: number): string {
  if (value > 1 || value == 0) {
      return 's';
  }
  return '';
}

export function getTopTwoReviews(reviews : Review[]): Review[]  {
  const sortedReviews = reviews.sort( (a, b) => b.stars - a.stars );
  return sortedReviews.slice(0, 2);
 }

export function addReviews(array : Review[]): void {
  if (!reviewContainerElement) {
    return;
  }
  const topTwo = getTopTwoReviews(array);
  const group = document.createElement('div');
    group.classList.add('list-group');
  topTwo.forEach((review) => {
    const item = document.createElement('div');
    item.classList.add('list-group-item');
    item.innerHTML = review.stars + ' stars from ' + review.name;
    group.appendChild(item);
    reviewContainerElement.appendChild(group);
  });
  showReviewButton?.classList.add('d-none');
}


export function handleReviewButton(reviews: Review[]): void {
  if (!showReviewButton) {
    return;
  }
  showReviewButton.addEventListener('click', () => addReviews(reviews));
}

export function injectMainPropertyImage(imageUrl: string): void {
  if (!imageContainerElement) {
    return;
  }
  const image = document.createElement('img');
  image.setAttribute('src', imageUrl);
  image.classList.add('img-fluid');
  imageContainerElement.appendChild(image);
}

export function injectRecommendedProperties(properties: Property[], you: User): void {
  if (!propertiesContainerElement) {
    return;
  }
  properties.forEach((property) => {

    const column = createDivElement('', ['col-12', 'col-md-4']);
    const card = createDivElement('', ['card', 'mb-3']);
    const cardHeader = createDivElement(property.title, ['card-header']);
    const cardBody = createDivElement('', ['card-body']);
    const cardFooter = createDivElement('', ['card-footer', 'd-flex', 'justify-content-between']);

    if (property.isAvailable) {
      const badge = createDivElement('Available', ['badge', 'text-bg-success']);
      cardFooter.appendChild(badge);
    }
   
    card.appendChild(cardHeader); 
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    column.appendChild(card);

    const image = createImageElement(property.image, ['img-fluid']);
    cardBody.appendChild(image)
    showDetails(you.permissions, cardFooter, property.price);
    propertiesContainerElement.appendChild(column);
  });
}

export function createDivElement(text: string, classes: string[]): HTMLDivElement {
  const divElement = document.createElement('div');
  divElement.innerHTML = text;
  classes.forEach((classItem) => divElement.classList.add(classItem));
  return divElement;
}

export function createImageElement(src: string, classes: string[]): HTMLDivElement {
  const imageElement = document.createElement('img');
  classes.forEach((classItem) => imageElement.classList.add(classItem));
  imageElement.setAttribute('src', src);
  return imageElement;
}

export function showDetails(access: boolean | Permissions, element : HTMLDivElement, price: number) {
  if (access) {
      const priceDisplay = document.createElement('div');
      priceDisplay.innerHTML = price.toString() + '/night';
      element.appendChild(priceDisplay);
  }
}

export function injectTenRandomJokes(url: string): void {

  axios.get(url).then((res) => {
    res.data.forEach((joke: Joke) => {

      const column = createDivElement('', ['col-12', 'col-md-4']);

      const card = createDivElement('', ['card', 'mb-3']);
      const cardHeader = createDivElement(joke.setup, ['card-header']);
      const cardBody = createDivElement(joke.punchline, ['card-body']);
      const cardFooter = createDivElement(joke.type, ['card-footer', 'text-muted', 'small']);

    
      card.appendChild(cardHeader); 
      card.appendChild(cardBody);
      card.appendChild(cardFooter);

      column.appendChild(card);


      jokesContainerElement?.appendChild(column);
    });

    
  }).catch((error) => console.error(error));

}
