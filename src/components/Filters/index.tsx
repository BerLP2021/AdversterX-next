'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import useDebounce from '@/hooks/useDebounce'

type Props = { cities: string[] | undefined; companies: string[] | undefined }

type FilterType = Array<string>

function Filters({ cities, companies }: Props) {
  const searchParams = useSearchParams()

  const { push } = useRouter()

  const [citiesChecked, setCitiesChecked] = useState<FilterType>(searchParams.get('cities')?.split(',').filter(Boolean) || [])
  const [companiesChecked, setCompaniesChecked] = useState<FilterType>(searchParams.get('companies')?.split(',').filter(Boolean) || [])

  const queryString = [
    citiesChecked.length ? `cities=${citiesChecked.join(',')}` : '',
    companiesChecked.length ? `companies=${companiesChecked.join(',')}` : '',
  ].filter(Boolean).join('&');

  const deferredQuery = useDebounce(queryString, 1000);

  useEffect(() => {
    const prevSearchParams = new URLSearchParams(searchParams)

    const newSearchParams = new URLSearchParams(deferredQuery)
    if (newSearchParams.has('cities')) {
      prevSearchParams.set('cities', newSearchParams.get('cities') || '')
    } else {
      prevSearchParams.delete('cities')
    }
    if (newSearchParams.has('companies')) {
      prevSearchParams.set('companies', newSearchParams.get('companies') || '')
    } else {
      prevSearchParams.delete('companies')
    }
    if (prevSearchParams.toString() !== searchParams.toString()) push(`?${prevSearchParams.toString()}`)
  }, [deferredQuery, push, searchParams])

  const handleCheckboxChange = (
    filterName: string,
    curValue: FilterType extends Array<infer First> ? First : never,
    values: FilterType,
    setValues: React.Dispatch<React.SetStateAction<FilterType>>,
  ) => {
    return (checked: boolean) => {
      const curSearchParams = new URLSearchParams(searchParams)
      const prevFilterQuery = values.join(',')
      let newFilterQuery = ''

      if (checked) {
        setValues([...values, curValue])
        newFilterQuery = prevFilterQuery
          ? prevFilterQuery + ',' + curValue
          : curValue
      } else {
        setValues(values.filter((item) => item !== curValue))
        newFilterQuery = values.filter((item) => item !== curValue).join(',')
      }
      if (newFilterQuery) curSearchParams.set(filterName, newFilterQuery)
      else curSearchParams.delete(filterName)
    }
  }

  const clearAll = () => {
    if (searchParams.has('companies') || searchParams.has('cities')) {
      const curSearchParams = new URLSearchParams(searchParams)
      curSearchParams.delete('companies')
      curSearchParams.delete('cities')
      setCitiesChecked([])
      setCompaniesChecked([])
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>
        <Button onClick={clearAll} variant={'ghost'} className="group ">
          <X className="size-4 transition-colors text-red-600  group-hover:text-red-600" />
          <span className=" italic lg:order-5">(clear filters)</span>
          <span className="sr-only">Clear all filters</span>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={['item-1', 'item-2']}
        className="w-full space-y-2"
      >
        {cities && (
          <AccordionItem
            value="item-1"
            className="overflow-hidden rounded-lg border-1 border-gray-200"
          >
            <AccordionTrigger className="cursor-pointer rounded-none rounded-t-lg bg-gray-200 px-4 font-semibold dark:bg-gray-800">
              City
            </AccordionTrigger>
            <AccordionContent className="space-y-2 p-4">
              {cities.map((city) => (
                <div key={city} className="flex items-center gap-2 w-full">
                  <Checkbox
                    id={city}
                    name={city}
                    checked={citiesChecked.includes(city)}
                    onCheckedChange={handleCheckboxChange(
                      'cities',
                      city,
                      citiesChecked,
                      setCitiesChecked,
                    )}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={city}
                    className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block truncate"
                  >
                    {city}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
        {companies && (
          <AccordionItem
            value="item-2"
            className="overflow-hidden rounded-lg border-1! border-gray-200"
          >
            <AccordionTrigger className="cursor-pointer rounded-none rounded-t-lg bg-gray-200 px-4 font-semibold dark:bg-gray-800">
              Company
            </AccordionTrigger>
            <AccordionContent className="space-y-2 p-4">
              {companies.map((company) => (
                <div key={company} className="flex items-center gap-2">
                  <Checkbox
                    id={company}
                    name={company}
                    checked={companiesChecked.includes(company)}
                    onCheckedChange={handleCheckboxChange(
                      'companies',
                      company,
                      companiesChecked,
                      setCompaniesChecked,
                    )}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={company}
                    className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block truncate"
                  >
                    {company}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}

export default Filters
