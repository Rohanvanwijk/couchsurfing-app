const reviewTotalDisplay = document.querySelector('#reviews');
const returningUserDisplay = document.querySelector('#returning-user');
const userNameDisplay = document.querySelector('#user');

export function populateUser(isReturning : boolean, userName: string ) {
  if (isReturning == true && returningUserDisplay) {
      returningUserDisplay.innerHTML = 'back';
  }
  if (userNameDisplay) {
    userNameDisplay.innerHTML = userName;
  }
}
