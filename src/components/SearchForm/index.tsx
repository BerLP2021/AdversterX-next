'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import useDebounce from '@/hooks/useDebounce'
import { Label } from '../ui/label'

type Props = { className?: string }

function SearchForm({ className }: Props) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const debouncedValue = useDebounce(searchQuery, 500)

  const { push } = useRouter()

  const handleSearch = () => {
    if (debouncedValue === searchParams.get('search')) return

    const newSearchParams = new URLSearchParams(searchParams)
    if (debouncedValue) {
      if (newSearchParams.has('search')) {
        newSearchParams.set('search', debouncedValue as string)
      } else {
        newSearchParams.append('search', debouncedValue as string)
      }
    } else {
      newSearchParams.delete('search')
    }
    push(`?${newSearchParams.toString()}`)
  }

  useEffect(() => {
    handleSearch()
  }, [debouncedValue])

  return (
    <>
      <div className={cn('relative', className)}>
        <Label className="sr-only">Search</Label>
        <Input
          type="search"
          placeholder="Search user"
          className="w-full pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="ghost"
          className="hover:border-input absolute top-1/2 right-0 -translate-y-1/2 rounded-l-none border-1 border-transparent"
          onClick={() => handleSearch()}
        >
          <Search />
        </Button>
      </div>
    </>
  )
}

export default SearchForm
