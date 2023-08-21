-- CreateTable
CREATE TABLE "artist" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);
