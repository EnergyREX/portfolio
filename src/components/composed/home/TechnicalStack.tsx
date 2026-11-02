import React from 'react'
import { Body, Eyebrow, Heading } from '../../primitives/Typography'
import Card from '../Card'

const TechnicalStack = () => {
  return (
    <section id="technical-stack" className="grid grid-cols-12 gap-px bg-soft">
        <div className="w-full h-full justify-center content-center col-span-12 lg:col-span-3 bg-background p-6 sm:p-10">
              <Eyebrow>Stack Tecnológico</Eyebrow>
        </div>

        <div className="w-full h-full col-span-12 lg:col-span-9 flex flex-col gap-px bg-soft">
            <Card className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6'>
                <div className='flex flex-row items-center gap-4'>
                  <Eyebrow>01.</Eyebrow>
                  <Heading className="font-bold">FRONTEND</Heading>
                </div>
                <Body>
                  React, Next.js, React Query, Tailwind CSS
                </Body>
            </Card>

            <Card className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6'>
                <div className='flex flex-row items-center gap-4'>
                  <Eyebrow>02.</Eyebrow>
                  <Heading className="font-bold">BACKEND</Heading>
                </div>
                <Body>
                  Node.js, Fastify, arquitectura hexagonal, DDD
                </Body>
            </Card>

            <Card className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6'>
              <div className='flex flex-row items-center gap-4'>
                <Eyebrow>03.</Eyebrow>
                <Heading className="font-bold">DATOS E INFRAESTRUCTURA</Heading>
              </div>
            <Body>
                PostgreSQL, Redis, BullMQ, Docker, Caddy, Cloudflare
            </Body>
            </Card>

            <Card className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6'>
                <div className='flex flex-row items-center gap-4'>
                  <Eyebrow>04.</Eyebrow>
                  <Heading className="font-bold">IA</Heading>
                </div>
                <Body>
                  Parsing de CVs con VLMs (Qwen2.5-VL, Grok API), Ollama, Claude Code, OpenCode.
                </Body>
            </Card>
        </div>
    </section>
  )
}

export default TechnicalStack