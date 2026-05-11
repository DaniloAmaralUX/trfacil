import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type KPIItem = {
  label: string
  value: number
  description: string
}

type TRKpiCardsProps = {
  items: KPIItem[]
}

export function TRKpiCards({ items }: TRKpiCardsProps) {
  return (
    <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {items.map((item) => (
        <Card
          key={item.label}
          className='surface-card rounded-[24px] border-black/5 dark:border-white/10'
        >
          <CardHeader className='pb-2'>
            <CardDescription>{item.label}</CardDescription>
            <CardTitle className='text-3xl font-semibold tabular-nums'>
              {item.value}
            </CardTitle>
          </CardHeader>
          <CardContent className='text-sm leading-6 text-muted-foreground text-pretty'>
            {item.description}
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
