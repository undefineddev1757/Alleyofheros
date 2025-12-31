/*
  Warnings:

  - You are about to drop the column `authorName` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `bannerTitle` on the `find_hero_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `searchPlaceholder` on the `find_hero_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `aboutText` on the `footer_settings` table. All the data in the column will be lost.
  - You are about to drop the column `copyrightText` on the `footer_settings` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `footer_settings` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `footer_settings` table. All the data in the column will be lost.
  - You are about to drop the column `privacyPolicyUrl` on the `footer_settings` table. All the data in the column will be lost.
  - You are about to drop the column `termsOfServiceUrl` on the `footer_settings` table. All the data in the column will be lost.
  - You are about to drop the column `aboutLabel` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `aboutText1` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `aboutText2` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `aboutTitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `gallerySubtitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `galleryTitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `heroDescription` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `heroSubtitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `heroTitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `heroesSubtitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `heroesTitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `stoneQuote` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `stoneTitle` on the `home_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `bannerSubtitle` on the `your_stories_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `bannerTitle` on the `your_stories_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `formButtonText` on the `your_stories_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `formSubtitle` on the `your_stories_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `formTitle` on the `your_stories_page_settings` table. All the data in the column will be lost.
  - You are about to drop the column `searchPlaceholder` on the `your_stories_page_settings` table. All the data in the column will be lost.
  - Added the required column `heroName` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroStory` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hero" ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "content" JSONB;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "authorName",
DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "heroName" TEXT NOT NULL,
ADD COLUMN     "heroStory" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "find_hero_page_settings" DROP COLUMN "bannerTitle",
DROP COLUMN "searchPlaceholder",
ADD COLUMN     "bannerTitle_en" TEXT,
ADD COLUMN     "bannerTitle_ua" TEXT,
ADD COLUMN     "searchPlaceholder_en" TEXT,
ADD COLUMN     "searchPlaceholder_ua" TEXT;

-- AlterTable
ALTER TABLE "footer_settings" DROP COLUMN "aboutText",
DROP COLUMN "copyrightText",
DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "privacyPolicyUrl",
DROP COLUMN "termsOfServiceUrl",
ADD COLUMN     "aboutText_en" TEXT,
ADD COLUMN     "aboutText_ua" TEXT,
ADD COLUMN     "copyrightText_en" TEXT,
ADD COLUMN     "copyrightText_ua" TEXT;

-- AlterTable
ALTER TABLE "home_page_settings" DROP COLUMN "aboutLabel",
DROP COLUMN "aboutText1",
DROP COLUMN "aboutText2",
DROP COLUMN "aboutTitle",
DROP COLUMN "gallerySubtitle",
DROP COLUMN "galleryTitle",
DROP COLUMN "heroDescription",
DROP COLUMN "heroSubtitle",
DROP COLUMN "heroTitle",
DROP COLUMN "heroesSubtitle",
DROP COLUMN "heroesTitle",
DROP COLUMN "stoneQuote",
DROP COLUMN "stoneTitle",
ADD COLUMN     "aboutLabel_en" TEXT,
ADD COLUMN     "aboutLabel_ua" TEXT,
ADD COLUMN     "aboutText1_en" TEXT,
ADD COLUMN     "aboutText1_ua" TEXT,
ADD COLUMN     "aboutText2_en" TEXT,
ADD COLUMN     "aboutText2_ua" TEXT,
ADD COLUMN     "aboutTitle_en" TEXT,
ADD COLUMN     "aboutTitle_ua" TEXT,
ADD COLUMN     "gallerySubtitle_en" TEXT,
ADD COLUMN     "gallerySubtitle_ua" TEXT,
ADD COLUMN     "galleryTitle_en" TEXT,
ADD COLUMN     "galleryTitle_ua" TEXT,
ADD COLUMN     "heroDescription_en" TEXT,
ADD COLUMN     "heroDescription_ua" TEXT,
ADD COLUMN     "heroSubtitle_en" TEXT,
ADD COLUMN     "heroSubtitle_ua" TEXT,
ADD COLUMN     "heroTitle_en" TEXT,
ADD COLUMN     "heroTitle_ua" TEXT,
ADD COLUMN     "heroesSubtitle_en" TEXT,
ADD COLUMN     "heroesSubtitle_ua" TEXT,
ADD COLUMN     "heroesTitle_en" TEXT,
ADD COLUMN     "heroesTitle_ua" TEXT,
ADD COLUMN     "stoneQuote_en" TEXT,
ADD COLUMN     "stoneQuote_ua" TEXT,
ADD COLUMN     "stoneTitle_en" TEXT,
ADD COLUMN     "stoneTitle_ua" TEXT;

-- AlterTable
ALTER TABLE "your_stories_page_settings" DROP COLUMN "bannerSubtitle",
DROP COLUMN "bannerTitle",
DROP COLUMN "formButtonText",
DROP COLUMN "formSubtitle",
DROP COLUMN "formTitle",
DROP COLUMN "searchPlaceholder",
ADD COLUMN     "bannerSubtitle_en" TEXT,
ADD COLUMN     "bannerSubtitle_ua" TEXT,
ADD COLUMN     "bannerTitle_en" TEXT,
ADD COLUMN     "bannerTitle_ua" TEXT,
ADD COLUMN     "formButtonText_en" TEXT,
ADD COLUMN     "formButtonText_ua" TEXT,
ADD COLUMN     "formSubtitle_en" TEXT,
ADD COLUMN     "formSubtitle_ua" TEXT,
ADD COLUMN     "formTitle_en" TEXT,
ADD COLUMN     "formTitle_ua" TEXT,
ADD COLUMN     "searchPlaceholder_en" TEXT,
ADD COLUMN     "searchPlaceholder_ua" TEXT;
