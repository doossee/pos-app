import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const foods: Prisma.FoodCreateInput[] = [
  { name: "Burger", category: "Burger", price: 27000 },
  { name: "Dabl Burger", category: "Burger", price: 34000 },
  { name: "Chicken Burger", category: "Burger", price: 30000 },
  { name: "Chizburger", category: "Burger", price: 30000 },
  { name: "Dabl Chizburger", category: "Burger", price: 40000 },
  { name: "Chicken Chizburger", category: "Burger", price: 34000 },
  { name: "Ananasli Burger", category: "Burger", price: 40000 },
  { name: "Tochno Sochno", category: "Burger", price: 37000 },

  { name: "Lavash", category: "Lavash", price: 31000 },
  { name: "Lavash Ostriy", category: "Lavash", price: 32000 },
  { name: "Lavash Big", category: "Lavash", price: 35000 },
  { name: "Lavash Sirli", category: "Lavash", price: 34000 },
  { name: "Lavash Sirli Big", category: "Lavash", price: 36000 },
  { name: "Lavash Tandir", category: "Lavash", price: 33000 },
  { name: "Lavash Sosiskali", category: "Lavash", price: 28000 },

  { name: "Sous", category: "", price: 3000 },
  
  { name: "Hotdog", category: "Hotdog", price: 15000 },
  { name: "Hotdog Big", category: "Hotdog", price: 20000 },
  { name: "Hotdog Kanada", category: "Hotdog", price: 20000 },
  { name: "Hotdog Haggi", category: "Hotdog", price: 28000 },
  
  { name: "Sendvich Go'shtli", category: "Klab Sendvich", price: 35000 },
  { name: "Sendvich Tovuqli", category: "Klab Sendvich", price: 35000 },

  { name: "Shaurma", category: "Shaurma", price: 32000 },
  { name: "Shaurma Big", category: "Shaurma", price: 35000 },
  { name: "Shaurma Sirli", category: "Shaurma", price: 34000 },

  { name: "KFC 1-PORS", category: "KFC", price: 35000 },
  { name: "KFC 1-KG", category: "KFC", price: 100000 },

  { name: "Kartoshka Fri", category: "Garnir", price: 15000 },
  { name: "Toster Non", category: "Garnir", price: 3000 },

  { name: "Kola 0.5L", category: "Salqin Ichimliklar", price: 8000 },
  { name: "Fanta 0.5L", category: "Salqin Ichimliklar", price: 8000 },
  { name: "Sprite 0.5L", category: "Salqin Ichimliklar", price: 8000 },
  { name: "Kola 1L", category: "Salqin Ichimliklar", price: 13000 },
  { name: "Fanta 1L", category: "Salqin Ichimliklar", price: 13000 },
  { name: "Sprite 1L", category: "Salqin Ichimliklar", price: 13000 },
  { name: "Kola 1.5L", category: "Salqin Ichimliklar", price: 16000 },
  { name: "Fanta 1.5L", category: "Salqin Ichimliklar", price: 16000 },
  { name: "Sprite 1.5L", category: "Salqin Ichimliklar", price: 16000 },
  { name: "Fuse Tea 0.5L", category: "Salqin Ichimliklar", price: 8000 },
  { name: "Fuse Tea 1L", category: "Salqin Ichimliklar", price: 11000 },
  { name: "Gazlangan Suv 0.5L", category: "Salqin Ichimliklar", price: 3000 },
  { name: "Gazlangan Suv 1L", category: "Salqin Ichimliklar", price: 4000 },
  { name: "Gazlangan Suv 1.5L", category: "Salqin Ichimliklar", price: 5000 },
  { name: "Gazlanmagan Suv 0.5L", category: "Salqin Ichimliklar", price: 3000 },
  { name: "Gazlanmagan Suv 1L", category: "Salqin Ichimliklar", price: 4000 },
  { name: "Gazlanmagan Suv 1.5L", category: "Salqin Ichimliklar", price: 5000 },

  { name: "Qora Choy", category: "Issiq Ichimliklar", price: 5000 },
  { name: "Ko'k Choy", category: "Issiq Ichimliklar", price: 5000 },
  { name: "Limon Choy", category: "Issiq Ichimliklar", price: 15000 },
  { name: "Kivi Choy", category: "Issiq Ichimliklar", price: 15000 },
  { name: "Qora Kofe", category: "Issiq Ichimliklar", price: 6000 },
  { name: "Kofe 3/1", category: "Issiq Ichimliklar", price: 6000 },

  { name: "Moxito Kivi", category: "Moxito", price: 18000 },
  { name: "Moxito Qulupnay", category: "Moxito", price: 18000 },
  { name: "Moxito Mix", category: "Moxito", price: 18000 },
  { name: "Moxito Blue", category: "Moxito", price: 18000 },
  { name: "Moxito Malina", category: "Moxito", price: 18000 },
  { name: "Moxito Tarxun", category: "Moxito", price: 18000 },
  { name: "Moxito Mint", category: "Moxito", price: 18000 },
  { name: "Moxito Classic", category: "Moxito", price: 18000 },
  { name: "Moxito Apelsin", category: "Moxito", price: 18000 },
  { name: "Moxito Limon", category: "Moxito", price: 18000 },
  { name: "Ice Kofe", category: "Moxito", price: 15000 },
  
  { name: "Moxito Kivi", category: "Moxito", price: 22000 },
  { name: "Moxito Qulupnay", category: "Moxito", price: 22000 },
  { name: "Moxito Mix", category: "Moxito", price: 22000 },
  { name: "Moxito Blue", category: "Moxito", price: 22000 },
  { name: "Moxito Malina", category: "Moxito", price: 22000 },
  { name: "Moxito Tarxun", category: "Moxito", price: 22000 },
  { name: "Moxito Mint", category: "Moxito", price: 22000 },
  { name: "Moxito Classic", category: "Moxito", price: 22000 },
  { name: "Moxito Apelsin", category: "Moxito", price: 22000 },
  { name: "Moxito Limon", category: "Moxito", price: 22000 },
  { name: "Ice Kofe", category: "Moxito", price: 18000 },
  
  { name: "Pepperoni", category: "Kichik", price: 60000 },
  { name: "Go'shtli", category: "Kichik", price: 60000 },
  { name: "Mix", category: "Kichik", price: 65000 },
  { name: "Qazilik", category: "Kichik", price: 27000 },
  { name: "4 Fasl", category: "Kichik", price: 65000 },
  { name: "Qo'ziqorinlik", category: "Kichik", price: 60000 },
  { name: "Kombo", category: "Kichik", price: 55000 },
  { name: "Chicken", category: "Kichik", price: 65000 },
  { name: "Bolajon", category: "Kichik", price: 55000 },
  { name: "Ananas", category: "Kichik", price: 27000 },
  { name: "Margarita", category: "Kichik", price: 50000 },
  { name: "Go'shtli Asorti", category: "Kichik", price: 90000 },
  { name: "Pepperoni 2x2", category: "Kichik", price: 70000 },
  { name: "Katletlik", category: "Kichik", price: 60000 },
  { name: "3x1", category: "Kichik", price: 70000 },
  { name: "Amerikanskiy", category: "Kichik", price: 65000 },
  { name: "50%50", category: "Kichik", price: 60000 },
  { name: "Gigant", category: "Kichik", price: 120000 },

  { name: "Pepperoni", category: "O'rta", price: 70000 },
  { name: "Go'shtli", category: "O'rta", price: 70000 },
  { name: "Mix", category: "O'rta", price: 80000 },
  { name: "Qazilik", category: "O'rta", price: 50000 },
  { name: "4 Fasl", category: "O'rta", price: 75000 },
  { name: "Qo'ziqorinlik", category: "O'rta", price: 70000 },
  { name: "Kombo", category: "O'rta", price: 65000 },
  { name: "Chicken", category: "O'rta", price: 75000 },
  { name: "Bolajon", category: "O'rta", price: 65000 },
  { name: "Ananas", category: "O'rta", price: 50000 },
  { name: "Margarita", category: "O'rta", price: 60000 },
  { name: "Go'shtli Asorti", category: "O'rta", price: 100000 },
  { name: "Pepperoni 2x2", category: "O'rta", price: 80000 },
  { name: "Katletlik", category: "O'rta", price: 70000 },
  { name: "3x1", category: "O'rta", price: 80000 },
  { name: "Amerikanskiy", category: "O'rta", price: 75000 },
  { name: "50%50", category: "O'rta", price: 70000 },
  { name: "Gigant", category: "O'rta", price: 130000 },

  { name: "Pepperoni", category: "Katta", price: 80000 },
  { name: "Go'shtli", category: "Katta", price: 80000 },
  { name: "Mix", category: "Katta", price: 95000 },
  { name: "Qazilik", category: "Katta", price: 60000 },
  { name: "4 Fasl", category: "Katta", price: 85000 },
  { name: "Qo'ziqorinlik", category: "Katta", price: 80000 },
  { name: "Kombo", category: "Katta", price: 75000 },
  { name: "Chicken", category: "Katta", price: 85000 },
  { name: "Bolajon", category: "Katta", price: 75000 },
  { name: "Ananas", category: "Katta", price: 60000 },
  { name: "Margarita", category: "Katta", price: 70000 },
  { name: "Go'shtli Asorti", category: "Katta", price: 110000 },
  { name: "Pepperoni 2x2", category: "Katta", price: 90000 },
  { name: "Katletlik", category: "Katta", price: 80000 },
  { name: "3x1", category: "Katta", price: 90000 },
  { name: "Amerikanskiy", category: "Katta", price: 85000 },
  { name: "50%50", category: "Katta", price: 80000 },
  { name: "Gigant", category: "Katta", price: 150000 },
  
]

async function main() {
    await prisma.food.createMany({ data: foods })
    console.log('Foods added')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })