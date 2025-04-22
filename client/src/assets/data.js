import discount from './discount.jpg'
import cart_icon from './cart_icon.png'
import profile_icon from './profile_icon.png'
import search_icon from './search_icon.png'
import exchange_icon from "./exchange_icon.png"
import quality_icon from "./quality_icon.png"
import menu_icon from './menu_icon.png'
import cross_icon from './cross_icon.png'
import dropdown_icon from './dropdown_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import discount_img from "./discount_img.jpg";
import orderconfirmed from "./orderconfirmed.png"
import paypal from "./paypal.jpg"
import Stripe from "./Stripe.png"

import slider1 from './carousel1.jpg'
import slider2 from './carousel2.jpg'
import slider3 from './carousel3.jpg'

import person1 from './person1.jpg'
import person2 from './person2.jpg'
import person3 from './person3.jpg'

import instagram from "./instagram.png"
import youtube from "./youtube.png"
import facebook from "./facebook.png"
import whatsapp from "./whatsapp.png"

export const assets = {
  discount,
  exchange_icon,
  quality_icon,
  about_img,
  contact_img,
  search_icon, 
  cart_icon, 
  profile_icon,
  menu_icon,
  dropdown_icon,
  cross_icon,
  discount_img,
  orderconfirmed,
  paypal,
  Stripe
}

export const socialmedia = [
  instagram,
  youtube,
  facebook,
  whatsapp
]

export const persons = [
  {
    _id: 1,
    img: person1,
    name: "james",
    brand: "XYZ Company",
    reviews: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam earum fugiat tempore? Eius eaque tempore laborum adipisci ea ex atque!"
  },
  {
    _id: 2,
    img: person2,
    name: "jun",
    brand: "ABCDE Company",
    reviews: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam earum fugiat tempore? Eius eaque tempore laborum adipisci ea ex atque!"
  },
  {
    _id: 3,
    img: person3,
    name: "sasuke",
    brand: "ABC Company",
    reviews: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam earum fugiat tempore? Eius eaque tempore laborum adipisci ea ex atque!"
  },
]

export const carouselItem = [
  {
    id: 1,
    img: slider2,
    title: "Men's Trend",
    desc: "Trending Now: Bold Colors and Prints. Up to 50% Off Selected Items",
  },
  {
    id: 2,
    img: slider1,
    title: "Woman's Trend",
    desc: "Best Sellers: Must-Have Wardrobe Pieces. Don't Miss Out!",
  },
  {
    id: 3,
    img: slider3,
    title: "Kid's Trends",
    desc: "Best Sellers: Must-Have Wardrobe Pieces. Don't Miss Out!",
  },
]
