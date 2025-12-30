// Типы блоков для страницы героя

export type BlockType = 
  | 'text_quote'           // Текст с цитатой
  | 'two_column_text'      // Текст в 2 колонки
  | 'single_image'         // Одно изображение
  | 'two_images'           // Два изображения рядом
  | 'horizontal_scroller'  // Горизонтальный скролл
  | 'dark_quote_section'   // Темная секция
  | 'divider'              // Разделитель

export interface TextQuoteBlock {
  type: 'text_quote'
  id: string
  title: string
  columnText1: string
  columnText2: string
  imageUrl?: string
  imageUrl2?: string
  imageLayout?: 'single' | 'two_side' // одно фото или два рядом
  imageSize?: 'small' | 'medium' | 'large'
}

export interface TwoColumnTextBlock {
  type: 'two_column_text'
  id: string
  title: string
  columnText1: string
  columnText2: string
}

export interface SingleImageBlock {
  type: 'single_image'
  id: string
  imageUrl: string
  size: 'small' | 'medium' | 'large'
}

export interface TwoImagesBlock {
  type: 'two_images'
  id: string
  imageUrl1: string
  imageUrl2: string
}

export interface ScrollerColumn {
  id: string
  quoteIcon?: boolean
  title?: string
  text?: string
  imageUrl?: string
  isLarge?: boolean
}

export interface HorizontalScrollerBlock {
  type: 'horizontal_scroller'
  id: string
  title: string
  columns: ScrollerColumn[]
  backgroundColor?: 'beige' | 'white'
}

export interface DarkQuoteBlock {
  id: string
  text: string
  isLarge?: boolean
}

export interface DarkQuoteSectionBlock {
  type: 'dark_quote_section'
  id: string
  title: string
  backgroundImage: string
  quotes: DarkQuoteBlock[]
}

export interface DividerBlock {
  type: 'divider'
  id: string
}

export type HeroBlock = 
  | TextQuoteBlock
  | TwoColumnTextBlock
  | SingleImageBlock
  | TwoImagesBlock
  | HorizontalScrollerBlock
  | DarkQuoteSectionBlock
  | DividerBlock

export interface HeroContent {
  blocks: HeroBlock[]
}

// Шаблоны блоков по умолчанию
export const defaultBlocks: Record<BlockType, Omit<HeroBlock, 'id'>> = {
  text_quote: {
    type: 'text_quote',
    title: 'Заголовок секції',
    columnText1: 'Текст першої колонки...',
    columnText2: 'Текст другої колонки...',
    imageLayout: 'single',
  },
  two_column_text: {
    type: 'two_column_text',
    title: 'Заголовок',
    columnText1: 'Текст першої колонки...',
    columnText2: 'Текст другої колонки...',
  },
  single_image: {
    type: 'single_image',
    imageUrl: '',
    size: 'large',
  },
  two_images: {
    type: 'two_images',
    imageUrl1: '',
    imageUrl2: '',
  },
  horizontal_scroller: {
    type: 'horizontal_scroller',
    title: 'Заголовок секції',
    columns: [
      {
        id: Date.now().toString(),
        quoteIcon: true,
        title: 'Заголовок колонки',
        text: 'Текст колонки...',
      }
    ],
  },
  dark_quote_section: {
    type: 'dark_quote_section',
    title: '24 лютого 2022',
    backgroundImage: '',
    quotes: [
      {
        id: Date.now().toString(),
        text: 'Текст цитати...',
        isLarge: true,
      }
    ],
  },
  divider: {
    type: 'divider',
  },
}

// Названия блоков для UI
export const blockNames: Record<BlockType, string> = {
  text_quote: 'Текст з цитатою + фото',
  two_column_text: 'Текст у 2 колонки',
  single_image: 'Одне зображення',
  two_images: 'Два зображення',
  horizontal_scroller: 'Горизонтальний скрол',
  dark_quote_section: 'Темна секція',
  divider: 'Роздільник',
}

// Описания блоков
export const blockDescriptions: Record<BlockType, string> = {
  text_quote: 'Заголовок + текст у 2 колонки + 1-2 зображення',
  two_column_text: 'Заголовок + текст у дві колонки',
  single_image: 'Одне зображення (маленьке/середнє/велике)',
  two_images: 'Два зображення поруч',
  horizontal_scroller: 'Колонки з горизонтальним скролом + прогрес-бар',
  dark_quote_section: 'Темна секція з фоном + цитати',
  divider: 'Горизонтальна лінія-роздільник',
}

