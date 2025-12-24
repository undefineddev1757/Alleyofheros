-- CreateTable
CREATE TABLE "home_page_settings" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "heroDescription" TEXT,
    "heroVideoUrl" TEXT,
    "aboutLabel" TEXT,
    "aboutTitle" TEXT,
    "aboutText1" TEXT,
    "aboutText2" TEXT,
    "heroesTitle" TEXT,
    "heroesSubtitle" TEXT,
    "showHeroesSlider" BOOLEAN NOT NULL DEFAULT true,
    "stoneTitle" TEXT,
    "stoneQuote" TEXT,
    "stoneImageUrl" TEXT,
    "showStoneBlock" BOOLEAN NOT NULL DEFAULT true,
    "galleryTitle" TEXT,
    "gallerySubtitle" TEXT,
    "showGallery" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "home_page_settings_pkey" PRIMARY KEY ("id")
);
