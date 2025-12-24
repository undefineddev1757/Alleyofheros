-- CreateTable
CREATE TABLE "footer_settings" (
    "id" TEXT NOT NULL,
    "aboutText" TEXT,
    "copyrightText" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "twitterUrl" TEXT,
    "youtubeUrl" TEXT,
    "telegramUrl" TEXT,
    "linkedinUrl" TEXT,
    "privacyPolicyUrl" TEXT,
    "termsOfServiceUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "footer_settings_pkey" PRIMARY KEY ("id")
);
