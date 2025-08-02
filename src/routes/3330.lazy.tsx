import { createLazyFileRoute } from "@tanstack/react-router"

import i1 from "@/assets/3330/3330_01.webp"
import i2 from "@/assets/3330/3330_02.webp"
import i3 from "@/assets/3330/3330_03.webp"
import i4 from "@/assets/3330/3330_04.webp"
import i5 from "@/assets/3330/3330_05.webp"
import i6 from "@/assets/3330/3330_06.webp"
import i7 from "@/assets/3330/3330_07.webp"
import i8 from "@/assets/3330/3330_08.webp"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const Route = createLazyFileRoute("/3330")({
  component: Problem3330,
})

function Problem3330() {
  return (
    <Carousel className="w-[600px] ml-14">
      <CarouselContent>
        {[i1, i2, i3, i4, i5, i6, i7, i8].map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-auto items-center justify-center p-6">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
