-- CreateTable
CREATE TABLE "find_hero_page_settings" (
    "id" TEXT NOT NULL,
    "bannerTitle" TEXT,
    "searchPlaceholder" TEXT,
    "medalImageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "find_hero_page_settings_pkey" PRIMARY KEY ("id")
);
