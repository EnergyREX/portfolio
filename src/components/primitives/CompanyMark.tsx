import Image from 'next/image'
import type { Job } from '@/lib/experience'

export const CompanyMark =({ company, color, logo }: Pick<Job, 'company' | 'color' | 'logo'>) => (
  <div
    aria-hidden
    className="flex size-12 shrink-0 items-center justify-center border sm:size-14"
    style={logo ? { borderColor: color } : { borderColor: color, backgroundColor: color }}
  >
    {logo ? (
      <Image src={logo} alt="" width={150} height={150} className="size-full object-cover rounded-xs" />
    ) : (
      <span className="font-mono text-sm font-semibold text-on-main">
        {company.slice(0, 2)}
      </span>
    )}
  </div>
)