export const categories = [
    { parent: "Food Menu", name: "Burger", image: "/images/burger.png" },
    { parent: "Food Menu", name: "Lavash", image: "/images/shawarma.png" },
    { parent: "Food Menu", name: "Hotdog", image: "/images/hotdog.png" },
    { parent: "Food Menu", name: "Klab Sendvich", image: "/images/bread.png" },
    { parent: "Food Menu", name: "Shaurma", image: "/images/taco.png" },
    { parent: "Food Menu", name: "KFC", image: "/images/fried-chicken.png" },
    { parent: "Food Menu", name: "Garnir", image: "/images/french-fries.png" },
    
    { parent: "Drink Menu", name: "Salqin Ichimliklar", image: "/images/drinks.png" },
    { parent: "Drink Menu", name: "Issiq Ichimliklar", image: "/images/tea-cup.png" },
    { parent: "Drink Menu", name: "Moxito", image: "/images/drink.png" },

    { parent: "Pizza Menu", name: "Kichik", image: "/images/pizza-small.png" },
    { parent: "Pizza Menu", name: "O'rta", image: "/images/pizza-medium.png" },
    { parent: "Pizza Menu", name: "Katta", image: "/images/pizza-big.png" },
]

export const generatedFunction = (n: number) => {
    var letterIndex = Math.floor((n - 1) / 99);
    var letter = String.fromCharCode((letterIndex % 26) + 65);
    var number = ((n - 1) % 99) + 1;
    return letter + '-' + number;
}