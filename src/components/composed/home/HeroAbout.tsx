import React from 'react'
import { Display, DisplayBody, DisplayH2, Eyebrow } from '../../primitives/Typography'
import Button from '../../primitives/Button'

const HeroAbout = () => {
  return (
    <section id="hero-about" className="w-full grid grid-cols-6 gap-px bg-soft">
        <div id="main-about" className="p-6 sm:p-10 col-span-6 bg-background">
            <Display>Francisco Javier<br />Martín Fernández</Display>
            <DisplayH2>Desarrollador de software fullstack</DisplayH2>
            <Eyebrow>Basado en Almería, España</Eyebrow>
            <DisplayBody className='py-5'>
              Desarrollo software, desde su idea, hasta su implementación ideal, con un enfoque
              escalable, listo para producción y robusto.
            </DisplayBody>
            <div className='flex flex-row flex-wrap gap-3'>
                <Button href='/projects'>Ver mis proyectos</Button>
                <Button variant='secondary' href='/CV_ES.pdf' target='_blank' rel='noreferrer'>CV en español</Button>
                <Button variant='secondary' href='/CV-EN.pdf' target='_blank' rel='noreferrer'>CV en inglés</Button>
            </div>
        </div>
    </section>
  )
}

export default HeroAbout