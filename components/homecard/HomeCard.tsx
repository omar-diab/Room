import { cn } from "@/lib/utils"
import { HomeCardProps } from "@/types/types"
import Image from "next/image"



const HomeCard = ({ img, title, description, hendleClick, className }: HomeCardProps) => {
  return (
    <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[370px] min-h-[260px] rounded-[14px] cursor-pointer', className)} onClick={hendleClick}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src={img} alt={title} width={27} height={27}/>
            </div>
            <div className="flex flex-col gap-2 ">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
    </div>
  )
}

export default HomeCard