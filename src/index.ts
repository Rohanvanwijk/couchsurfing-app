import 'bootstrap/dist/css/bootstrap.min.css';
import { populateUser, showReviewTotal, handleReviewButton, injectMainPropertyImage, injectRecommendedProperties, injectTenRandomJokes } from './utils';
import type Review from 'interfaces/Review';
import LoyaltyUser from 'enums/LoyaltyUser';
import Permissions from 'enums/Permissions';
import type User from 'interfaces/User';
import MainProperty from 'classes/MainProperty';
import type Property from 'interfaces/Property';

const you: User = {
    firstName: 'Bobby',
    lastName: 'Cat',
    permissions: Permissions.ADMIN,
    isReturning: true,
    age: 25,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow'],
};

populateUser(you.isReturning, you.firstName, you.permissions);

const reviews: Review[] = [
    {
        name: 'Ania',
        stars: 4,
        loyaltyUser: LoyaltyUser.SILVER_USER,
        date: '02-02-2003',
    },
    {
        name: 'Omar',
        stars: 2,
        loyaltyUser: LoyaltyUser.BRONZE_USER,
        date: '02-12-2012',
    },
    {
        name: 'Sheila',
        stars: 5,
        loyaltyUser: LoyaltyUser.GOLD_USER,
        date: '09-10-2019',
    }
];

showReviewTotal(reviews.length, reviews[reviews.length - 1].name, reviews[reviews.length - 1].loyaltyUser);

handleReviewButton(reviews);

const yourMainProperty = new MainProperty(
    'https://images.squarespace-cdn.com/content/v1/5adb89f2aa49a19e7960b934/1557099326895-W3RC2H2ZZKTV36ZDC46F/mike-kelley-monterrey-contemporary-architecture-1.jpg?format=750w', 
    'American House',
    reviews,
    );

injectMainPropertyImage(yourMainProperty.image);

const properties : Property[] = [
    {
        image: 'https://3.bp.blogspot.com/_66wLSvlmTMg/SvxYtlyei5I/AAAAAAAAAFY/jjfo6GZy4Qo/s400/DSCN1124.JPG',
        title: 'Colombian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 45632,
            country: 'Colombia'
        },
        contact: [+112343823978921, 'marywinkle@gmail.com'],
        isAvailable: true  
    },
    {
        image: 'https://beta.greenbuildingadvisor.com/app/uploads/sites/default/files/images/iStock_000001770115XSmall.jpg',
        title: 'Polish Cottage',
        price: 30,
        location: {
            firstLine: 'no 23',
            city: 'Gdansk',
            code: 343903,
            country: 'Poland'
        },
        contact: [+1298239028490830, 'garydavis@hotmail.com'],
        isAvailable: false 
    },
    {
        image: 'https://assets.architecturaldesigns.com/plan_assets/36001/original/36001DK_e_1479202141.jpg?1506330110',
        title: 'London Flat',
        price: 25,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 'SW4 5XW',
            country: 'United Kingdom',
        },
        contact: [+34829374892553, 'andyluger@aol.com'],
        isAvailable: true
    },
    {
        image: 'https://cloud.funda.nl/valentina_media/167/369/177_720x480.jpg',
        title: 'Huize ‘Eiken Bosch’',
        price: 45,
        location: {
            firstLine: 'Zandvoorterweg 61 A',
            city: 'Aerdenhout',
            code: '2111 GT',
            country: 'Netherlands',
        },
        contact: [+310235243424, 'info@funda.nl'],
        isAvailable: true,
    }
]

injectRecommendedProperties(properties, you);

injectTenRandomJokes('https://official-joke-api.appspot.com/jokes/programming/ten');

