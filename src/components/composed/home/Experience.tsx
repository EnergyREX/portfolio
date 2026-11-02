import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, Heading, Lead } from '../../primitives/Typography'
import Card from '../Card'
import { JOBS } from '@/lib/experience'
import { CompanyMark } from '@/components/primitives/CompanyMark'

const Experience = () => {
  return (
    <section id="experience" className="grid grid-cols-12 gap-px bg-soft">
        <div className="w-full h-full content-center align-middle col-span-12 lg:col-span-3 bg-background p-6 sm:p-10">
              <Eyebrow>Experiencia laboral</Eyebrow>
        </div>

        <div className="w-full h-full col-span-12 lg:col-span-9 flex flex-col gap-px bg-soft">
              {JOBS.map((job) => (
                <Card
                  key={job.slug}
                  className="group relative flex flex-row items-center gap-4 transition-colors hover:bg-surface-overlay has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-main sm:gap-5"
                >
                  <CompanyMark company={job.company} color={job.color} logo={job.logo} />

                  <div className='flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4'>
                    <div className='min-w-0'>
                      <Heading>
                        <Link
                          href={`/experience/${job.slug}`}
                          className='after:absolute after:inset-0 focus-visible:outline-none'
                        >
                          {job.role}  •  <span style={{ color: job.color }}>{job.company}</span>
                        </Link>
                      </Heading>

                      <p className='pt-1 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors group-hover:text-main'>
                        Click para ver más
                      </p>
                    </div>

                    <Lead className='shrink-0'>{job.period}</Lead>
                  </div>

                  <ArrowUpRight
                    aria-hidden
                    className='size-5 shrink-0 text-text-secondary transition-colors group-hover:text-main'
                  />
                </Card>
              ))}
        </div>
    </section>
  )
}

export default Experience
