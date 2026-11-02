import { CompanyMark } from '@/components/primitives/CompanyMark'
import { Heading, Eyebrow, Lead } from '../../primitives/Typography'
import Card from '../Card'
import { EDUCATION } from '@/constants/EDUCATION'
import { ArrowUpRight } from 'lucide-react'

const Education = () => {
  return (
    <section id="education" className="grid grid-cols-12 gap-px bg-soft">
        <div className="w-full h-full content-center align-middle col-span-12 lg:col-span-3 bg-background p-6 sm:p-10">
              <Eyebrow>Educación</Eyebrow>
        </div>

        <div className="w-full h-full col-span-12 lg:col-span-9 flex flex-col gap-px bg-soft">
              {EDUCATION.map((e) => (
                <Card
                  key={e.slug}
                  className="group relative flex flex-row items-center gap-4 transition-colors has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-main sm:gap-5"
                >
                  <CompanyMark company={e.company} color={e.color} logo={e.logo} />

                  <div className='flex min-w-0 flex-1 flex-row items-baseline justify-between gap-1 sm:gap-4'>
                    <div className='min-w-0'>
                      <Heading>
                          {e.role}  •  <span style={{ color: e.color }}>{e.company}</span>
                      </Heading>
                    </div>

                    <Lead className='shrink-0'>{e.period}</Lead>
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

export default Education
