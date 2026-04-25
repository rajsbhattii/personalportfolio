"use client"

import { BentoBox } from "./bento-box"
import { AboutBox } from "./about-box"
import { ContactBox } from "./contact-box"
import { SkillsBox } from "./skills-box"
import { GalleryBox } from "./gallery-box"
import { WorkBox } from "./work-box"


export function BentoGrid() {
  return (
    <div className="h-dvh w-dvw p-4 md:p-6 lg:p-8 overflow-hidden bg-background">
      {/* Mobile Layout - 2 columns */}
      <div className="grid md:hidden grid-cols-2 gap-3 h-full">
        <AboutBox className="row-span-2" />
        <WorkBox />
        <BentoBox id="projects" label="Projects" />
        <ContactBox />
        <SkillsBox />
      </div>

      {/* Tablet Layout - 3 columns */}
      <div className="hidden md:grid lg:hidden grid-cols-3 gap-4 h-full">
        <AboutBox className="col-span-2 row-span-2" />
        <WorkBox />
        <BentoBox id="projects" label="Projects" />
        <ContactBox />
        <SkillsBox />
        <BentoBox id="blog" label="Blog" />
      </div>

      {/* Desktop Layout - 4 columns */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-4 h-full">
        <AboutBox className="col-span-2 row-span-2" />
        <WorkBox className="row-span-2" />
        <BentoBox id="projects" label="Projects" />
        <ContactBox />
        <SkillsBox />
        <GalleryBox />
        <BentoBox id="blog" label="Blog" className="col-span-2" />
      </div>
    </div>
  )
}
