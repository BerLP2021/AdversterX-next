import { Skeleton } from '@/components/ui/skeleton'

export default function AnimatedLoader() {
  return (
    <div
      className="mx-auto w-full max-w-[1280px] overflow-hidden p-5"
    >
      <Skeleton className="mx-auto h-[50px] w-[300px] rounded-xl" />
      <div className="mx-auto mt-4 flex flex-1 lg:justify-between flex-col lg:flex-row lg:w-full gap-5 lg:gap-0 relative w-[70%] md:w-[90%] min-w-[300px]">
        <div className="hidden lg:flex w-1/4 grow-0 flex-col gap-4 border-r border-gray-200 pr-5">
          <Skeleton className="h-[36px] w-full rounded-xl" />
          <hr />
          <Skeleton className="h-[36px] w-full rounded-xl" />
          <Skeleton className="h-[390px] w-full rounded-xl" />
          <Skeleton className="h-[390px] w-full rounded-xl" />
        </div>
        <div className="flex flex-col items-center w-full lg:w-3/4 space-y-2 ">
          <div className="flex w-full flex-col items-center gap-5">
            <Skeleton className="h-[36px] w-full lg:hidden rounded-xl" />
            <Skeleton className="h-[48px] w-[150px] lg:w-[300px] rounded-xl self-end" />
          </div>
          <div className=" w-full lg:pl-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
            <Skeleton className="h-[340px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
