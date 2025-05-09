"use client"

import { Button } from "../ui/button";
import Filters from "../Filters";
import SearchForm from "../SearchForm";
import { cn } from "@/lib/utils";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useSearchParams } from "next/navigation";
import { useMatchMediaContext } from "../context";

type AsideBarsProps = {
  cities: string[] | undefined
  companies: string[] | undefined
}
export default function AsideBars({
  cities,
  companies,
}: AsideBarsProps) {
  const { isMobile, isTablet } = useMatchMediaContext();

  const searchParams = useSearchParams();
  const citiesQuery = searchParams.get('cities');
  const companiesQuery = searchParams.get('companies');
  const searchQuery = searchParams.get('search');

  if (isMobile || isTablet) return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="w-[70%]">
        <Button variant="outline" className={cn('lg:hidden w-full ', searchQuery || citiesQuery || companiesQuery ? 'bg-blue-400 dark:bg-blue-400 hover:bg-blue-500' : '')}>Filters and Search</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="sr-only">Filters and Search</DrawerTitle>
        </DrawerHeader>
        <AsideBarsBody cities={cities} companies={companies} />
      </DrawerContent>
    </Drawer>
  )

  return (
    <AsideBarsBody cities={cities} companies={companies} className="hidden lg:flex" />
  )
}

function AsideBarsBody({
  cities,
  companies,
  className
}: Pick<AsideBarsProps, 'cities' | 'companies'> & { className?: string }) {

  return (
    <aside className={cn("flex lg:w-1/4 grow-0 flex-col gap-4 lg:border-r border-dashed border-gray-200 px-5 lg:pl-0", className)}>
      <SearchForm />
      <hr />
      <Filters cities={cities} companies={companies} />
    </aside>
  )
}
