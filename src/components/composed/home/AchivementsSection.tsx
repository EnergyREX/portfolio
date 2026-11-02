import React from 'react'
import { Body, Eyebrow, Heading } from '../../primitives/Typography'
import Card from '../Card'

const AchivementsSection = () => {
  return (
    <section id="achivements" className="grid grid-cols-12 gap-px bg-soft">
        <div className="w-full h-full justify-center content-center col-span-12 lg:col-span-3 bg-background p-6 sm:p-10">
              <Eyebrow>Mis principales logros</Eyebrow>
        </div>

        <div className="w-full h-full col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-soft">
            <Card>
                <Heading className="font-bold ">ARQUITECTURA</Heading>
                <Body>
                  Aprendí a aplicar Domain Driven Design en menos de un año y llevé aplicaciones a producción basándose en los principios aprendidos.
                </Body>
            </Card>

            <Card>
                <Heading className="font-bold">OWNERSHIP TÉCNICO DE SISTEMAS CRÍTICOS</Heading>
                <Body>He asumido responsabilidades en las que he desarrollado proyectos que sostienen partes importantes del negocio.</Body>
            </Card>

            <Card>
              <Heading className="font-bold">OPENSOURCE</Heading>
              <Body>Soy partidario de desarrollar código abierto y auditable por todos.</Body>
            </Card>

            <Card>
                <Heading className="font-bold">AUTODIDACTA</Heading>
                <Body>No he llegado hasta aquí por mi formación, llegué a pesar de mi formación.</Body>
            </Card>

            <Card>
                <Heading className="font-bold">A FAVOR DE LA IA</Heading>
                <Body>La IA es una herramienta, como cualquier otra. Sin embargo, hemos de ser responsables en su uso, sobre todo en entornos críticos de producción o de editorial.</Body>
            </Card>

            <Card>
                <Heading className="font-bold">RECHAZO AL HYPE</Heading>
                <Body>El Hype al final suele ser nocivo, fomentando muchos mensajes extremos, que nublan la visión de lo que está ocurriendo.</Body>
            </Card>
        </div>
    </section>
  )
}

export default AchivementsSection