"use client"

import { BentoBox } from "./bento-box"

const bentoItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "skills", label: "Skills" },
  { id: "blog", label: "Blog" },
]

export function BentoGrid() {
  return (
    <div className="h-dvh w-dvw p-4 md:p-6 lg:p-8 overflow-hidden bg-background">
      {/* Mobile Layout - 2 columns */}
      <div className="grid md:hidden grid-cols-2 gap-3 h-full">
        <BentoBox id="about" label="About" className="row-span-2" />
        <BentoBox id="work" label="Work" />
        <BentoBox id="projects" label="Projects" />
        <BentoBox id="contact" label="Contact" />
        <BentoBox id="skills" label="Skills" />
      </div>

      {/* Tablet Layout - 3 columns */}
      <div className="hidden md:grid lg:hidden grid-cols-3 gap-4 h-full">
        <BentoBox id="about" label="About" className="col-span-2 row-span-2" />
        <BentoBox id="work" label="Work" />
        <BentoBox id="projects" label="Projects" />
        <BentoBox id="contact" label="Contact" />
        <BentoBox id="skills" label="Skills" />
        <BentoBox id="blog" label="Blog" />
      </div>

      {/* Desktop Layout - 4 columns */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-4 h-full">
        <BentoBox id="about" label="About" className="col-span-2 row-span-2" />
        <BentoBox id="work" label="Work" className="row-span-2" />
        <BentoBox id="projects" label="Projects" />
        <BentoBox id="contact" label="Contact" />
        <BentoBox id="skills" label="Skills" />
        <BentoBox id="gallery" label="Gallery" />
        <BentoBox id="blog" label="Blog" className="col-span-2" />
      </div>
    </div>
  )
}
