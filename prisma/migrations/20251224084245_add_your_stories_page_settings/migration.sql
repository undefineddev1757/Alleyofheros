-- CreateTable
CREATE TABLE "your_stories_page_settings" (
    "id" TEXT NOT NULL,
    "bannerTitle" TEXT,
    "bannerSubtitle" TEXT,
    "searchPlaceholder" TEXT,
    "formTitle" TEXT,
    "formSubtitle" TEXT,
    "formButtonText" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "your_stories_page_settings_pkey" PRIMARY KEY ("id")
);
