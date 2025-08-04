import { type ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
}

const Section = ({ title, subtitle, children }: Props) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-orange-400 mb-4 flex justify-between items-center">
        <span>{title}</span>
        {subtitle && (
          <span className="text-sm font-normal text-zinc-400">{subtitle}</span>
        )}
      </h2>
      {children}
    </section>
  )
}

export default Section
