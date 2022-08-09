// Dummy data
// Shops and what item is sold by the shop.
// shopType: {id: int, name: string, items: [{id: int, name: string, price: int}]}
const shops = [
    {
      id: 1,
      name: "Drink Stall",
      items: [
        { id: 1, name: "Coffee", price: 1 },
        { id: 2, name: "Tea", price: 2 },
        { id: 3, name: "Milo", price: 3 },
        { id: 4, name: "Milo Dinosaur", price: 3 },
      ],
    },
    {
      id: 2,
      name: "Western Food stall",
      items: [
        { id: 5, name: "Chicken Chop", price: 12 },
        { id: 6, name: "Spaghetti", price: 10 },
        { id: 7, name: "Burger", price: 10 },
        { id: 8, name: "Ice Cream", price: 11 },
        { id: 10, name: "Noodles", price: 12 },
      ],
    },
    {
      id: 3,
      name: "Chinese Food stall",
      items: [
        { id: 9, name: "Chicken", price: 12 },
        { id: 10, name: "Noodles", price: 10 },
        { id: 11, name: "Pork", price: 10 },
        { id: 12, name: "Rice", price: 11 },
        { id: 13, name: "Beef", price: 11 },
        { id: 5, name: "Chicken Chop", price: 12 },
        { id: 6, name: "Spaghetti", price: 10 },
      ],
    },
  ];
  
  // Items and what shop sells the item.
  // itemType: {id: int, name: string, price: int, shop: {id: int, name: string}}
  const items = [
    { id: 1, name: "Coffee", price: 1, shops: [shops[0]] },
    { id: 2, name: "Tea", price: 2, shops: [shops[0]] },
    { id: 3, name: "Milo", price: 3, shops: [shops[0]] },
    { id: 4, name: "Milo Dinosaur", price: 3, shops: [shops[0]] },
    { id: 5, name: "Chicken Chop", price: 12, shops: [shops[1], shops[2]] },
    { id: 6, name: "Spaghetti", price: 10, shops: [shops[1], shops[2]] },
    { id: 7, name: "Burger", price: 10, shops: [shops[1]] },
    { id: 8, name: "Ice Cream", price: 11, shops: [shops[1]] },
    { id: 9, name: "Chicken", price: 12, shops: [shops[2]] },
    { id: 10, name: "Noodles", price: 10, shops: [shops[1], shops[2]] },
    { id: 11, name: "Pork", price: 10, shops: [shops[2]] },
    { id: 12, name: "Rice", price: 11, shops: [shops[2]] },
    { id: 13, name: "Beef", price: 11, shops: [shops[2]] },
  ];


  module.exports = {items, shops};