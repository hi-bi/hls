import { Favorites, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const favorites: Favorites[] = [
  { id: '0', artists: [], albums: [], tracks: [] },
];

for (const favorite of favorites) {
    
  prisma.favorites.create({
    data: favorite,
  })
  .then((res) => {
    console.log('insert result: ', res);
  })
  .catch((err) => {
    console.log('error result: ', err);
  })
  
}

prisma.$disconnect();
