'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function getSortValue(
  searchParams: URLSearchParams,
): keyof typeof sortOptions | 'none' {
  if (searchParams.has('sort') && searchParams.has('order')) {
    const sort = searchParams.get('sort')
    const order = searchParams.get('order')
    switch (sort) {
      case 'name':
        return order === 'asc' ? 'name-asc' : 'name-desc'
      case 'username':
        return order === 'asc' ? 'username-asc' : 'username-desc'

      default:
        return 'none'
    }
  }
  return 'none'
}

const sortOptions = {
  'name-asc': 'Name (A-Z)',
  'name-desc': 'Name (Z-A)',
  'username-asc': 'UserName (A-Z)',
  'username-desc': 'UserName (Z-A)'
}

function SortingUsersSelect() {
  const searchParams = useSearchParams()

  const [sortParams, setSortParams] = useState<
    keyof typeof sortOptions | 'none'
  >(getSortValue(searchParams))
  const { push } = useRouter()

  const handleChangeSort = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('order')
    newSearchParams.delete('sort')

    switch (value) {
      case 'name-asc':
        newSearchParams.set('sort', 'name')
        newSearchParams.set('order', 'asc')
        setSortParams('name-asc')
        break
      case 'name-desc':
        newSearchParams.set('sort', 'name')
        newSearchParams.set('order', 'desc')
        setSortParams('name-desc')
        break
      case 'username-asc':
        newSearchParams.set('sort', 'username')
        newSearchParams.set('order', 'asc')
        setSortParams('username-asc')
        break
      case 'none':
        setSortParams('none')
        break
    }
    push(`${window.location.pathname}?${newSearchParams.toString()}`)
  }

  useEffect(() => {
    setSortParams(getSortValue(searchParams))
  }, [searchParams])

  return (
    <div className="flex flex-col items-end md:flex-row md:items-center justify-end">
      <span className="mr-2 md:font-bold select-none">Sort users by:</span>
      <Select onValueChange={handleChangeSort} value={sortParams}>
        <SelectTrigger className="w-[180px] italic">
          <SelectValue>
            {sortParams === 'none' ? 'none' : sortOptions[sortParams]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none" className="italic">
            none
          </SelectItem>
          <SelectItem value="name-asc">
            {sortOptions['name-asc']}
          </SelectItem>
          <SelectItem value="name-desc">
            {sortOptions['name-desc']}
          </SelectItem>
          <SelectItem value="username-asc">{sortOptions['username-asc']}</SelectItem>
          <SelectItem value="username-desc">
            {sortOptions['username-desc']}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortingUsersSelect
