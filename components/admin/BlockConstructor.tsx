"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from "lucide-react"
import { 
  HeroBlock, 
  BlockType, 
  blockNames,
  blockDescriptions,
  defaultBlocks,
  TextQuoteBlock,
  TwoColumnTextBlock,
  SingleImageBlock,
  TwoImagesBlock,
  HorizontalScrollerBlock,
  DarkQuoteSectionBlock,
  ScrollerColumn,
  DarkQuoteBlock
} from "@/types/hero-blocks"

interface BlockConstructorProps {
  blocks: HeroBlock[]
  onChange: (blocks: HeroBlock[]) => void
}

export function BlockConstructor({ blocks, onChange }: BlockConstructorProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set())

  const addBlock = (type: BlockType) => {
    const newBlock = {
      ...defaultBlocks[type],
      id: Date.now().toString(),
    } as HeroBlock
    
    onChange([...blocks, newBlock])
    setExpandedBlocks(new Set([...expandedBlocks, newBlock.id]))
  }

  const removeBlock = (id: string) => {
    onChange(blocks.filter(b => b.id !== id))
    const newExpanded = new Set(expandedBlocks)
    newExpanded.delete(id)
    setExpandedBlocks(newExpanded)
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return
    
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
    onChange(newBlocks)
  }

  const updateBlock = (id: string, updates: Partial<HeroBlock>) => {
    onChange(blocks.map(b => b.id === id ? { ...b, ...updates } : b))
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedBlocks(newExpanded)
  }

  return (
    <div className="space-y-6">
      {/* Кнопки добавления блоков со схемами */}
      <Card>
        <CardHeader>
          <CardTitle>Додати блок</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(Object.keys(blockNames) as BlockType[]).map(type => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="group relative flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                title={blockDescriptions[type]}
              >
                <BlockIcon type={type} />
                <span className="text-xs text-center font-medium leading-tight">{blockNames[type]}</span>
                <span className="text-[10px] text-muted-foreground text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {blockDescriptions[type]}
                </span>
                <Plus className="absolute top-2 right-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Список блоков */}
      <div className="space-y-4">
        {blocks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Немає блоків. Додайте перший блок вище.
            </CardContent>
          </Card>
        ) : (
          blocks.map((block, index) => (
            <Card key={block.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(block.id)}
                    >
                      <CardTitle className="text-base">
                        {blockNames[block.type]}
                      </CardTitle>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === blocks.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBlock(block.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedBlocks.has(block.id) && (
                <CardContent>
                  <BlockEditor block={block} onChange={(updates) => updateBlock(block.id, updates)} />
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

// Редактор для конкретного блока
function BlockEditor({ block, onChange }: { block: HeroBlock; onChange: (updates: Partial<HeroBlock>) => void }) {
  switch (block.type) {
    case 'text_quote':
      return <TextQuoteEditor block={block} onChange={onChange} />
    case 'two_column_text':
      return <TwoColumnTextEditor block={block} onChange={onChange} />
    case 'single_image':
      return <SingleImageEditor block={block} onChange={onChange} />
    case 'two_images':
      return <TwoImagesEditor block={block} onChange={onChange} />
    case 'horizontal_scroller':
      return <HorizontalScrollerEditor block={block} onChange={onChange} />
    case 'dark_quote_section':
      return <DarkQuoteSectionEditor block={block} onChange={onChange} />
    case 'divider':
      return <div className="text-sm text-muted-foreground">Роздільник не має налаштувань</div>
    default:
      return null
  }
}

// Редакторы для каждого типа блока
function TextQuoteEditor({ block, onChange }: { block: TextQuoteBlock; onChange: (updates: Partial<TextQuoteBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Заголовок</Label>
        <Input
          value={block.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>
      <div>
        <Label>Текст (колонка 1)</Label>
        <Textarea
          value={block.columnText1}
          onChange={(e) => onChange({ columnText1: e.target.value })}
          rows={4}
        />
      </div>
      <div>
        <Label>Текст (колонка 2)</Label>
        <Textarea
          value={block.columnText2}
          onChange={(e) => onChange({ columnText2: e.target.value })}
          rows={4}
        />
      </div>
      
      <div className="border-t pt-4">
        <Label className="text-base">Зображення</Label>
        <div className="space-y-4 mt-2">
          <div>
            <Label className="text-sm">Кількість фото</Label>
            <Select 
              value={block.imageLayout || 'single'} 
              onValueChange={(value) => onChange({ imageLayout: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Одне фото</SelectItem>
                <SelectItem value="two_side">Два фото поруч</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {block.imageLayout === 'two_side' ? (
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                label="Зображення 1"
                value={block.imageUrl || ''}
                onChange={(url) => onChange({ imageUrl: url })}
              />
              <ImageUpload
                label="Зображення 2"
                value={block.imageUrl2 || ''}
                onChange={(url) => onChange({ imageUrl2: url })}
              />
            </div>
          ) : (
            <>
              <div>
                <Label className="text-sm">Розмір зображення</Label>
                <Select 
                  value={block.imageSize || 'large'} 
                  onValueChange={(value) => onChange({ imageSize: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Маленьке</SelectItem>
                    <SelectItem value="medium">Середнє</SelectItem>
                    <SelectItem value="large">Велике</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ImageUpload
                label="Зображення"
                value={block.imageUrl || ''}
                onChange={(url) => onChange({ imageUrl: url })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function TwoColumnTextEditor({ block, onChange }: { block: TwoColumnTextBlock; onChange: (updates: Partial<TwoColumnTextBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Заголовок</Label>
        <Input
          value={block.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>
      <div>
        <Label>Текст (колонка 1)</Label>
        <Textarea
          value={block.columnText1}
          onChange={(e) => onChange({ columnText1: e.target.value })}
          rows={4}
        />
      </div>
      <div>
        <Label>Текст (колонка 2)</Label>
        <Textarea
          value={block.columnText2}
          onChange={(e) => onChange({ columnText2: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}

function SingleImageEditor({ block, onChange }: { block: SingleImageBlock; onChange: (updates: Partial<SingleImageBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Розмір</Label>
        <Select 
          value={block.size} 
          onValueChange={(value) => onChange({ size: value as any })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Маленьке</SelectItem>
            <SelectItem value="medium">Середнє</SelectItem>
            <SelectItem value="large">Велике</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ImageUpload
        label="Зображення"
        value={block.imageUrl}
        onChange={(url) => onChange({ imageUrl: url })}
      />
    </div>
  )
}

function TwoImagesEditor({ block, onChange }: { block: TwoImagesBlock; onChange: (updates: Partial<TwoImagesBlock>) => void }) {
  return (
    <div className="space-y-4">
      <ImageUpload
        label="Зображення 1"
        value={block.imageUrl1}
        onChange={(url) => onChange({ imageUrl1: url })}
      />
      <ImageUpload
        label="Зображення 2"
        value={block.imageUrl2}
        onChange={(url) => onChange({ imageUrl2: url })}
      />
    </div>
  )
}

function HorizontalScrollerEditor({ block, onChange }: { block: HorizontalScrollerBlock; onChange: (updates: Partial<HorizontalScrollerBlock>) => void }) {
  const addColumn = () => {
    const newColumn: ScrollerColumn = {
      id: Date.now().toString(),
      quoteIcon: false,
      title: '',
      text: '',
    }
    onChange({ columns: [...block.columns, newColumn] })
  }

  const removeColumn = (id: string) => {
    onChange({ columns: block.columns.filter(c => c.id !== id) })
  }

  const updateColumn = (id: string, updates: Partial<ScrollerColumn>) => {
    onChange({
      columns: block.columns.map(c => c.id === id ? { ...c, ...updates } : c)
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Заголовок секції</Label>
        <Input
          value={block.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Колонки ({block.columns.length})</Label>
          <Button size="sm" onClick={addColumn}>
            <Plus className="h-4 w-4 mr-1" />
            Додати колонку
          </Button>
        </div>

        {block.columns.map((column, index) => (
          <Card key={column.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Колонка {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeColumn(column.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">Заголовок</Label>
                <Input
                  value={column.title || ''}
                  onChange={(e) => updateColumn(column.id, { title: e.target.value })}
                  placeholder="Заголовок колонки..."
                />
              </div>
              <div>
                <Label className="text-xs">Текст</Label>
                <Textarea
                  value={column.text || ''}
                  onChange={(e) => updateColumn(column.id, { text: e.target.value })}
                  rows={3}
                  placeholder="Текст колонки..."
                />
              </div>
              <ImageUpload
                label="Зображення (необов'язково)"
                value={column.imageUrl || ''}
                onChange={(url) => updateColumn(column.id, { imageUrl: url })}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Иконки-схемы блоков
function BlockIcon({ type }: { type: BlockType }) {
  const iconProps = { className: "w-16 h-16", strokeWidth: 1.5 }
  
  switch (type) {
    case 'text_quote':
      return (
        <svg {...iconProps} viewBox="0 0 64 64" fill="none" stroke="currentColor">
          <rect x="4" y="8" width="56" height="4" rx="1" />
          <rect x="4" y="16" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="4" y="20" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="4" y="24" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="34" y="16" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="34" y="20" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="34" y="24" width="26" height="2" rx="1" opacity="0.5" />
          {/* Вариант 1: одно фото */}
          <rect x="4" y="32" width="26" height="24" rx="2" fill="currentColor" opacity="0.1" />
          <text x="17" y="46" textAnchor="middle" fontSize="7" fill="currentColor">1</text>
          {/* Вариант 2: два фото */}
          <rect x="34" y="32" width="12" height="24" rx="2" fill="currentColor" opacity="0.1" />
          <rect x="48" y="32" width="12" height="24" rx="2" fill="currentColor" opacity="0.1" />
          <text x="47" y="46" textAnchor="middle" fontSize="7" fill="currentColor">2</text>
        </svg>
      )
    case 'two_column_text':
      return (
        <svg {...iconProps} viewBox="0 0 64 64" fill="none" stroke="currentColor">
          <rect x="4" y="8" width="56" height="4" rx="1" />
          <rect x="4" y="16" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="4" y="20" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="4" y="24" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="4" y="28" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="34" y="16" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="34" y="20" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="34" y="24" width="26" height="2" rx="1" opacity="0.5" />
          <rect x="34" y="28" width="26" height="2" rx="1" opacity="0.5" />
        </svg>
      )
    case 'single_image':
      return (
        <svg {...iconProps} viewBox="0 0 64 64" fill="none" stroke="currentColor">
          <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.1" />
          <circle cx="20" cy="22" r="4" fill="currentColor" opacity="0.3" />
          <path d="M8 44 L24 28 L36 40 L48 28 L56 36 L56 56 L8 56 Z" fill="currentColor" opacity="0.2" />
        </svg>
      )
    case 'two_images':
      return (
        <svg {...iconProps} viewBox="0 0 64 64" fill="none" stroke="currentColor">
          <rect x="4" y="12" width="26" height="40" rx="2" fill="currentColor" opacity="0.1" />
          <rect x="34" y="12" width="26" height="40" rx="2" fill="currentColor" opacity="0.1" />
          <circle cx="12" cy="22" r="3" fill="currentColor" opacity="0.3" />
          <circle cx="42" cy="22" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      )
    case 'horizontal_scroller':
      return (
        <svg {...iconProps} viewBox="0 0 64 64" fill="none" stroke="currentColor">
          <rect x="4" y="8" width="56" height="4" rx="1" />
          <rect x="4" y="16" width="12" height="36" rx="1" fill="currentColor" opacity="0.1" />
          <rect x="20" y="16" width="12" height="36" rx="1" fill="currentColor" opacity="0.1" />
          <rect x="36" y="16" width="12" height="36" rx="1" fill="currentColor" opacity="0.1" />
          <rect x="52" y="16" width="8" height="36" rx="1" fill="currentColor" opacity="0.05" />
          <path d="M54 56 L60 56" strokeLinecap="round" strokeWidth="2" />
          <circle cx="57" cy="56" r="1.5" fill="currentColor" />
        </svg>
      )
    case 'dark_quote_section':
      return (
        <svg {...iconProps} viewBox="0 0 64 64" fill="none">
          <rect x="4" y="4" width="56" height="56" rx="2" fill="currentColor" opacity="0.9" />
          <rect x="8" y="8" width="48" height="4" rx="1" fill="white" opacity="0.8" />
          <rect x="8" y="16" width="36" height="2" rx="1" fill="white" opacity="0.5" />
          <rect x="8" y="20" width="36" height="2" rx="1" fill="white" opacity="0.5" />
          <rect x="8" y="24" width="36" height="2" rx="1" fill="white" opacity="0.5" />
          <path d="M12 36 L8 32 L12 32 Z" fill="#F2B202" />
          <path d="M20 36 L16 32 L20 32 Z" fill="#F2B202" />
        </svg>
      )
    case 'divider':
      return (
        <svg {...iconProps} viewBox="0 0 64 64" fill="none" stroke="currentColor">
          <path d="M8 32 L56 32" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="32" r="2" fill="currentColor" />
          <circle cx="32" cy="32" r="2" fill="currentColor" />
          <circle cx="48" cy="32" r="2" fill="currentColor" />
        </svg>
      )
    default:
      return <div className="w-16 h-16 bg-gray-200 rounded" />
  }
}

function DarkQuoteSectionEditor({ block, onChange }: { block: DarkQuoteSectionBlock; onChange: (updates: Partial<DarkQuoteSectionBlock>) => void }) {
  const addQuote = () => {
    const newQuote: DarkQuoteBlock = {
      id: Date.now().toString(),
      text: '',
      isLarge: false,
    }
    onChange({ quotes: [...block.quotes, newQuote] })
  }

  const removeQuote = (id: string) => {
    onChange({ quotes: block.quotes.filter(q => q.id !== id) })
  }

  const updateQuote = (id: string, updates: Partial<DarkQuoteBlock>) => {
    onChange({
      quotes: block.quotes.map(q => q.id === id ? { ...q, ...updates } : q)
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Заголовок</Label>
        <Input
          value={block.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      <ImageUpload
        label="Фонове зображення"
        value={block.backgroundImage}
        onChange={(url) => onChange({ backgroundImage: url })}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Цитати ({block.quotes.length})</Label>
          <Button size="sm" onClick={addQuote}>
            <Plus className="h-4 w-4 mr-1" />
            Додати цитату
          </Button>
        </div>

        {block.quotes.map((quote, index) => (
          <Card key={quote.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Цитата {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuote(quote.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={quote.text}
                onChange={(e) => updateQuote(quote.id, { text: e.target.value })}
                rows={3}
                placeholder="Текст цитати..."
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

