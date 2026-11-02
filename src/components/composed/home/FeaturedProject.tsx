import Badge from '../../primitives/Badge'
import { GITHUB_PROFILE_URL } from '@/lib/github'
import Button from '../../primitives/Button'
import { Body, Eyebrow, Heading } from '../../primitives/Typography'
import Card from '../Card'

const FeaturedProject = () => {
  return (
    <section id="featured-project" className="grid grid-cols-12 gap-px bg-soft">
        <div className="w-full h-full content-center align-middle hidden lg:block lg:col-span-3 bg-background p-6 sm:p-10">
              <Eyebrow>Proyecto destacado</Eyebrow>
              <Button href='/projects' className='my-3'>Ver otros proyectos</Button>
        </div>

        <div className="w-full h-full col-span-12 lg:col-span-9">
              <Card>
                    <Eyebrow>openats.energyrex.dev</Eyebrow>
                    <Heading className='font-bold font-[--color-main] pt-2'>OpenATS</Heading>
                    <Body className='max-w-5xl'>
                        Sistema de seguimiento de candidatos (ATS) self-hosted, con parsing de CV por modelos de visión-lenguaje (Qwen2.5-VL, Grok API) y un motor de scoring ponderado. Backend hexagonal/DDD con tres agregados principales, autenticación JWT + RBAC con caché en Redis, e ingesta de CVs vía pipeline BullMQ. Desplegado en producción sobre VPS con Docker Compose, Caddy y TLS automático.
                    </Body>
                    <div className='flex flex-row flex-wrap gap-2 sm:gap-3 my-2'>
                        <Badge>TypeScript</Badge>
                        <Badge>Node.js</Badge>
                        <Badge>DDD</Badge>
                        <Badge>JWT + RBAC</Badge>
                        <Badge>Redis</Badge>
                        <Badge>Docker Compose</Badge>
                        <Badge>Caddy</Badge>
                    </div>
                    <div className='flex flex-row flex-wrap gap-3 my-3'>
                        <Button href='https://openats.energyrex.dev' target='_blank' rel='noreferrer'>
                            Ver proyecto
                        </Button>

                        <Button
                            variant='secondary'
                            href={`${GITHUB_PROFILE_URL}/openats`}
                            target='_blank'
                            rel='noreferrer'
                        >
                            Repositorio
                        </Button>
                    </div>
              </Card>
        </div>
    </section>
  )
}

export default FeaturedProject