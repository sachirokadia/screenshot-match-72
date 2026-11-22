import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Aperture,
  ClipboardList,
  Expand,
  Files,
  Layers3,
  ScanFace,
  ShieldAlert,
  SunMedium,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import characterAndOutfitPanels from "@/assets/character_and_outfit_panels_1.jpg.asset.json";
import characterTurnaround from "@/assets/character_turnaround_2.jpg.asset.json";
import dialoguePortrait from "@/assets/dialogue_portrait_3.jpg.asset.json";
import npcLineup from "@/assets/npc_lineup_3.jpg.asset.json";
import outfitCustomisation from "@/assets/outfit_customisation_2.jpg.asset.json";
import protagonistPortraits2 from "@/assets/protagonist_portraits_2.jpg.asset.json";
import protagonistPortraits3 from "@/assets/protagonist_portraits_3.jpg.asset.json";
import visualBoard1 from "@/assets/visual_board_1.jpg.asset.json";
import visualBoard2 from "@/assets/visual_board_2.jpg.asset.json";
import visualBoard3 from "@/assets/visual_board_3.jpg.asset.json";

type ImageRatio = "feature" | "paired" | "panoramic" | "portrait";

type Artwork = {
  title: string;
  source: string;
  image: string;
  alt: string;
  ratio: ImageRatio;
  note: string;
  assignmentPending?: boolean;
};

const sections = [
  { id: "visual-direction", number: "01", label: "Visual direction", icon: SunMedium },
  { id: "protagonist", number: "02", label: "Protagonist studies", icon: ScanFace },
  { id: "portraits", number: "03", label: "Portrait references", icon: Aperture },
  { id: "turnarounds", number: "04", label: "Turnaround", icon: Layers3 },
  { id: "npc-lineup", number: "05", label: "NPC lineup", icon: UsersRound },
  { id: "wardrobe", number: "06", label: "Wardrobe", icon: Files },
  { id: "dialogue", number: "07", label: "Dialogue portraits", icon: ScanFace },
  { id: "production-guidelines", number: "08", label: "3D & animation", icon: ClipboardList },
  { id: "asset-gallery", number: "09", label: "Asset gallery", icon: Files },
];

const boardArtwork: [Artwork, ...Artwork[]] = [
  {
    title: "City-wide visual language",
    source: "visual_board_1.jpg",
    image: visualBoard1.url,
    alt: "A collage of sunset city scenes, interface studies, vehicles, characters, and color references.",
    ratio: "feature",
    note: "Primary mood and interface reference board.",
  },
  {
    title: "Color, city and interface studies",
    source: "visual_board_2.jpg",
    image: visualBoard2.url,
    alt: "A wide visual board of city scenes, character references, interface details, and palette cues.",
    ratio: "paired",
    note: "Secondary direction board; visual cues only.",
  },
  {
    title: "Character and environment overview",
    source: "visual_board_3.jpg",
    image: visualBoard3.url,
    alt: "A wide collage connecting character, wardrobe, city, and interface concepts.",
    ratio: "paired",
    note: "Cross-reference board for the supplied concepts.",
  },
];

const protagonistArtwork: Artwork[] = [
  {
    title: "Paired appearance study · close portrait",
    source: "protagonist_portraits_3.jpg",
    image: protagonistPortraits3.url,
    alt: "Two close portrait concepts: one with short dark hair, amber sunglasses, and a turquoise patterned shirt; one with long dark hair, gold hoop earrings, and a fuchsia top.",
    ratio: "paired",
    note: "Keep visible facial and wardrobe cues consistent across related studies.",
    assignmentPending: true,
  },
  {
    title: "Paired appearance study · alternate crop",
    source: "protagonist_portraits_2.jpg",
    image: protagonistPortraits2.url,
    alt: "An alternate paired portrait concept showing a man in a turquoise patterned shirt and a woman in a fuchsia top.",
    ratio: "portrait",
    note: "Alternate portrait framing; character-to-roster match is unverified.",
    assignmentPending: true,
  },
];

const portraitArtwork: Artwork = {
  title: "Portrait and outfit interface panel",
  source: "character_and_outfit_panels_1.jpg · duplicate of character_portraits_1.jpg",
  image: characterAndOutfitPanels.url,
  alt: "A wide game-interface concept strip with character portraits, dialogue text, outfit panels, and menu details.",
  ratio: "panoramic",
  note: "The two portrait-panel source files are pixel-identical; shown once here.",
  assignmentPending: true,
};

const turnaroundArtwork: Artwork = {
  title: "Body silhouette and profile study",
  source: "character_turnaround_2.jpg",
  image: characterTurnaround.url,
  alt: "A flat character turnaround concept with front, side, and rear views beside a larger portrait.",
  ratio: "feature",
  note: "2D concept reference only; this is not a finished or rigged 3D model.",
  assignmentPending: true,
};

const npcArtwork: Artwork = {
  title: "Crowd silhouette and wardrobe spread",
  source: "npc_lineup_3.jpg",
  image: npcLineup.url,
  alt: "A lineup of varied character concepts in colorful evening outfits against a city backdrop.",
  ratio: "panoramic",
  note: "Use for broad silhouette and wardrobe variety, not roster data.",
  assignmentPending: true,
};

const wardrobeArtwork: Artwork = {
  title: "Outfit option sheet",
  source: "outfit_customisation_2.jpg",
  image: outfitCustomisation.url,
  alt: "A wardrobe customization concept with several shirt options and a character preview.",
  ratio: "feature",
  note: "Clothing and menu concept; verify against actual game assets before assignment.",
  assignmentPending: true,
};

const dialogueArtwork: Artwork = {
  title: "Conversation portrait framing",
  source: "dialogue_portrait_3.jpg",
  image: dialoguePortrait.url,
  alt: "A close dialogue portrait concept of a woman in sunglasses against a palm-lined sunset scene.",
  ratio: "feature",
  note: "Expression and framing reference only; no dialogue performance is implied.",
  assignmentPending: true,
};

const galleryArtwork = [
  ...boardArtwork,
  ...protagonistArtwork,
  portraitArtwork,
  turnaroundArtwork,
  npcArtwork,
  wardrobeArtwork,
  dialogueArtwork,
];

const palette = [
  { label: "After-dark", className: "bg-background", role: "deep charcoal" },
  { label: "Sunset coral", className: "bg-coral", role: "warm highlight" },
  { label: "Neon rose", className: "bg-neon-rose", role: "magenta accent" },
  { label: "Pool cyan", className: "bg-aqua", role: "cool counterpoint" },
  { label: "Bougainvillea", className: "bg-violet", role: "violet note" },
  { label: "Last light", className: "bg-gold", role: "sunlit detail" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vice City Stories Character Art Bible — Reference Workspace" },
      {
        name: "description",
        content:
          "A cinematic character-design reference workspace for visual direction, portrait studies, wardrobe concepts, and production guidelines.",
      },
      {
        property: "og:title",
        content: "Vice City Stories Character Art Bible — Reference Workspace",
      },
      {
        property: "og:description",
        content:
          "Character and wardrobe concepts organized for visual review. Supplied artwork is reference material, not verified game content or finished models.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CharacterArtBible,
});

function CharacterArtBible() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-panel px-5 py-7 lg:flex">
          <a href="#top" className="mb-10 flex items-center gap-3" aria-label="Back to top">
            <span className="flex size-10 items-center justify-center border border-neon-rose/40 bg-neon-rose/10 text-neon-rose">
              <Aperture className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl uppercase leading-none tracking-wide">Vice City</span>
              <span className="mt-1 block text-[10px] uppercase text-muted-foreground">Character art bible</span>
            </span>
          </a>

          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground">Workspace index</p>
            <span className="font-display text-sm text-neon-rose">09</span>
          </div>
          <nav aria-label="Art bible sections" className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center gap-3 border-l-2 border-transparent px-2.5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-neon-rose hover:bg-raised hover:text-foreground"
                >
                  <span className="w-5 font-display text-xs text-muted-foreground group-hover:text-neon-rose">
                    {section.number}
                  </span>
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 truncate">{section.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-line pt-5">
            <div className="flex items-center gap-2 text-xs text-aqua">
              <span className="size-1.5 rounded-full bg-aqua" />
              Reference pack loaded
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              11 source files <span aria-hidden="true">·</span> 10 unique image compositions
            </p>
            <p className="mt-3 text-[10px] uppercase text-muted-foreground">Unofficial concept material</p>
          </div>
        </aside>

        <main id="top" className="min-w-0">
          <header className="flex min-h-16 items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6 lg:px-10">
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <span className="flex size-9 shrink-0 items-center justify-center border border-neon-rose/40 bg-neon-rose/10 text-neon-rose">
                <Aperture className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-lg uppercase leading-none">Vice City · Art Bible</span>
                <span className="mt-1 block text-[10px] uppercase text-muted-foreground">Reference workspace</span>
              </span>
            </div>
            <p className="hidden text-[11px] font-medium uppercase text-muted-foreground lg:block">
              Art department <span className="mx-2 text-neon-rose">/</span> Character reference desk
            </p>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="hidden border-coral/40 bg-coral/10 text-coral sm:inline-flex">
                CONCEPT ONLY
              </Badge>
              <Button variant="outline" size="sm" asChild className="h-9 border-line bg-panel text-xs">
                <a href="#production-guidelines">
                  <ClipboardList aria-hidden="true" />
                  <span className="hidden sm:inline">Production notes</span>
                  <span className="sm:hidden">Notes</span>
                </a>
              </Button>
            </div>
          </header>

          <nav
            aria-label="Art bible sections"
            className="sticky top-0 z-30 flex gap-1 overflow-x-auto border-b border-line bg-background/95 px-3 py-2 backdrop-blur lg:hidden"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-raised hover:text-foreground"
              >
                <span className="mr-1.5 font-display text-neon-rose">{section.number}</span>
                {section.label}
              </a>
            ))}
          </nav>

          <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 lg:px-10">
            <div className="studio-grid relative isolate -mx-4 mb-10 overflow-hidden border-b border-line px-4 pb-9 pt-8 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 lg:pb-12 lg:pt-10">
              <div className="relative">
                <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground">
                  <span>Visual development</span>
                  <span className="text-neon-rose">/</span>
                  <span>Reference pack · 11 files</span>
                  <span className="ml-1 inline-flex items-center gap-1.5 border border-gold/30 bg-gold/10 px-2 py-1 text-gold">
                    <ShieldAlert className="size-3" aria-hidden="true" />
                    Roster match pending
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-8 xl:flex-row xl:items-end">
                  <div className="max-w-3xl">
                    <h1 className="font-display text-[3rem] font-bold uppercase leading-[0.91] sm:text-[4rem] lg:text-[4.6rem]">
                      Character <br className="hidden sm:block" /><span className="text-coral">Art Bible</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                      A visual desk for the supplied Vice City Stories-inspired character concepts — organized for art review, not as verified game documentation.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-5 border-t border-line pt-4 xl:min-w-[360px] xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
                    <Metric value="09" label="Sections" />
                    <Metric value="11" label="Source files" />
                    <Metric value="00" label="Verified IDs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 flex gap-3 border-l-2 border-neon-rose bg-panel px-4 py-4 sm:px-5">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-neon-rose" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                <strong className="font-semibold text-foreground">Concept references only.</strong> The supplied artwork is unofficial visual material, not finished 3D models. Character-specific assignments remain awaiting verification against the actual game roster.
              </p>
            </div>

            <section id="visual-direction" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="01"
                title="Visual direction & palette"
                description="A sunset-soaked coastal mood built from warm coral, neon rose, pool cyan and deep after-dark shadows. Treat this as an art-direction read, not a locked production palette."
              />
              <div className="grid gap-7 xl:grid-cols-[1.45fr_0.75fr] xl:items-start">
                <ArtworkFigure artwork={boardArtwork[0]} onPreview={setSelectedArtwork} />
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
                  <PalettePanel />
                  <div className="border-t border-line pt-4">
                    <p className="text-[10px] font-semibold uppercase text-muted-foreground">Direction notes</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground">
                      <li className="flex gap-2"><span className="text-coral">01</span><span>Humid dusk, bright signage, reflective surfaces.</span></li>
                      <li className="flex gap-2"><span className="text-neon-rose">02</span><span>Graphic tropical prints against clean silhouettes.</span></li>
                      <li className="flex gap-2"><span className="text-aqua">03</span><span>Balance warm sunset light with cool cyan accents.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-7 grid gap-6 md:grid-cols-2">
                {boardArtwork.slice(1).map((artwork) => (
                  <ArtworkFigure key={artwork.source} artwork={artwork} onPreview={setSelectedArtwork} />
                ))}
              </div>
            </section>

            <section id="protagonist" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="02"
                title="Protagonist appearance references"
                description="Two paired portrait studies establish the visible look cues shown in the pack. Keep those cues coherent across related references while leaving every game-roster match unassigned."
              />
              <div className="mb-7 grid gap-5 border-y border-line py-5 md:grid-cols-2">
                <TraitNote
                  tone="aqua"
                  title="Male-coded portrait cues"
                  traits="Short dark side-part · amber lens shape · turquoise tropical shirt"
                />
                <TraitNote
                  tone="neon-rose"
                  title="Female-coded portrait cues"
                  traits="Long dark hair · gold hoop earrings · fuchsia top"
                />
              </div>
              <div className="grid gap-7 lg:grid-cols-2">
                {protagonistArtwork.map((artwork) => (
                  <ArtworkFigure key={artwork.source} artwork={artwork} onPreview={setSelectedArtwork} />
                ))}
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Both portrait subjects remain <span className="text-gold">awaiting verification</span>; no character identity is inferred here.
              </p>
            </section>

            <section id="portraits" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="03"
                title="Male & female portrait references"
                description="The combined panel provides an in-interface view of portrait crops and wardrobe context. Use it to compare framing and visible features, not to establish a canonical character identity."
              />
              <div className="grid gap-7 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
                <ArtworkFigure artwork={portraitArtwork} onPreview={setSelectedArtwork} />
                <div className="border-y border-line py-4">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Reference handling</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Keep portrait lighting and facial proportions aligned with the paired appearance studies. Confirm character names, roles and in-game portrait sources before attaching these concepts to a roster entry.
                  </p>
                  <Badge variant="outline" className="mt-4 border-gold/40 bg-gold/10 text-gold">Awaiting roster verification</Badge>
                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                    The two source filenames for this panel are an exact duplicate in the supplied pack; shown once to keep the reference set clean.
                  </p>
                </div>
              </div>
            </section>

            <section id="turnarounds" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="04"
                title="Character turnaround concepts"
                description="Use the flat views to read silhouette, stance and clothing continuity. They do not specify a production mesh, topology, scale or skeleton."
              />
              <div className="grid gap-7 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
                <ArtworkFigure artwork={turnaroundArtwork} onPreview={setSelectedArtwork} />
                <GuidanceNote
                  eyebrow="2D reference boundary"
                  title="A turnaround is not a model sheet for rigging."
                  text="Confirm proportion, camera angle and garment construction against verified in-game source assets before modeling. Keep the reference attached as a visual cue until its roster assignment is confirmed."
                />
              </div>
            </section>

            <section id="npc-lineup" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="05"
                title="NPC lineup references"
                description="A lineup view for broad crowd variety: silhouette, color grouping and wardrobe range. Individual people and roles are not identified by this concept sheet."
              />
              <ArtworkFigure artwork={npcArtwork} onPreview={setSelectedArtwork} />
            </section>

            <section id="wardrobe" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="06"
                title="Outfit & clothing concepts"
                description="Use the clothing options as design exploration. Continuity across paired character studies is a useful visual check; actual outfit ownership and availability still need verification."
              />
              <div className="grid gap-7 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
                <GuidanceNote
                  eyebrow="Wardrobe continuity"
                  title="Keep the signature read intact."
                  text="The turquoise printed shirt and the fuchsia top are recognizable cues in the supplied studies. Preserve the broad color and silhouette relationships across adaptations, but do not label either look as a verified in-game outfit."
                />
                <ArtworkFigure artwork={wardrobeArtwork} onPreview={setSelectedArtwork} />
              </div>
            </section>

            <section id="dialogue" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="07"
                title="Dialogue portraits & expressions"
                description="A close portrait for expression, framing and mood reference. The supplied still does not establish a finished dialogue portrait or an animated performance."
              />
              <div className="grid gap-7 xl:grid-cols-[1fr_0.82fr] xl:items-start">
                <ArtworkFigure artwork={dialogueArtwork} onPreview={setSelectedArtwork} />
                <GuidanceNote
                  eyebrow="Expression study"
                  title="Preserve expression readability."
                  text="Keep the face, hair silhouette and accessories legible at the intended conversation crop. Build expression ranges only after matching the verified character model and its production portrait style."
                />
              </div>
            </section>

            <section id="production-guidelines" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="08"
                title="3D modeling, rigging & animation"
                description="Production work stays on hold until the actual game roster and source assets are checked. These notes are guardrails for interpreting the concepts, not a claim about existing game pipelines."
              />
              <div className="border-y border-line">
                <ProductionRow
                  number="01"
                  title="Verify the source"
                  text="Match every character-specific concept to the real roster and approved source material before assigning a name, role or production task. Current assignment state: awaiting verification."
                  tag="Roster check"
                />
                <ProductionRow
                  number="02"
                  title="Model from verified proportions"
                  text="Treat the supplied turnaround as a flat silhouette cue only. Confirm scale, body proportions, garment construction and required views against verified in-game assets before creating a mesh."
                  tag="Concept only"
                />
                <ProductionRow
                  number="03"
                  title="Rig against the real character setup"
                  text="Do not infer joint placement, naming, skin weights, attachments or facial controls from a still image. Check the actual project’s rig conventions and character source before any rigging work."
                  tag="Not rigged"
                />
                <ProductionRow
                  number="04"
                  title="Validate motion in context"
                  text="The artwork contains no timing or motion data. Compare animation, facial response and deformation with verified in-game references and the applicable production setup."
                  tag="No motion data"
                />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                No gameplay, production game assets or separate game repository were changed.
              </p>
            </section>

            <section id="asset-gallery" className="scroll-mt-24 border-t border-line pb-14 pt-10">
              <SectionHeading
                number="09"
                title="Asset gallery & production status"
                description="Every unique image composition from the supplied pack, labeled by its current reference-only status. Character-specific matches remain unverified."
              />
              <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-3 text-[10px] font-semibold uppercase">
                <span className="inline-flex items-center gap-2 text-coral"><span className="size-2 rounded-full bg-coral" />Reference only</span>
                <span className="inline-flex items-center gap-2 text-gold"><span className="size-2 rounded-full bg-gold" />Roster match pending</span>
                <span className="text-muted-foreground">11 files · 10 unique compositions</span>
              </div>
              <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {galleryArtwork.map((artwork) => (
                  <ArtworkFigure key={`gallery-${artwork.source}`} artwork={artwork} onPreview={setSelectedArtwork} compact />
                ))}
              </div>
            </section>

            <footer className="flex flex-col justify-between gap-3 border-t border-line pt-5 text-[10px] uppercase text-muted-foreground sm:flex-row">
              <span>Character art bible · reference workspace</span>
              <span>Concept artwork is not official or production-ready game material</span>
            </footer>
          </div>
        </main>
      </div>

      <Dialog open={selectedArtwork !== null} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
        <DialogContent className="max-w-6xl border-line bg-panel p-3 sm:p-5">
          {selectedArtwork && (
            <>
              <DialogHeader className="pr-10 text-left">
                <DialogTitle className="font-display text-2xl uppercase">{selectedArtwork.title}</DialogTitle>
                <DialogDescription>{selectedArtwork.source}</DialogDescription>
              </DialogHeader>
              <div className="flex max-h-[72vh] items-center justify-center overflow-hidden border border-line bg-background">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.alt}
                  className="max-h-[72vh] w-full object-contain"
                />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{selectedArtwork.note}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl leading-none text-foreground">{value}</p>
      <p className="mt-2 text-[9px] font-semibold uppercase text-muted-foreground">{label}</p>
    </div>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7 grid gap-3 sm:grid-cols-[72px_minmax(0,1fr)]">
      <p className="font-display text-lg leading-none text-neon-rose">{number}<span className="text-muted-foreground"> / 09</span></p>
      <div>
        <h2 className="font-display text-3xl font-semibold uppercase leading-none sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ArtworkFigure({
  artwork,
  onPreview,
  compact = false,
}: {
  artwork: Artwork;
  onPreview: (artwork: Artwork) => void;
  compact?: boolean;
}) {
  const ratioClass: Record<ImageRatio, string> = {
    feature: "aspect-[3/2]",
    paired: "aspect-[16/10]",
    panoramic: "aspect-[16/7]",
    portrait: "aspect-[5/4]",
  };

  return (
    <figure className="group min-w-0">
      <div className={`relative overflow-hidden border border-line bg-raised ${ratioClass[artwork.ratio]}`}>
        <img
          src={artwork.image}
          alt={artwork.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
        />
        <Button
          variant="ghost"
          size="icon"
          title={`Open preview: ${artwork.title}`}
          aria-label={`Open preview: ${artwork.title}`}
          onClick={() => onPreview(artwork)}
          className="absolute right-2 top-2 size-9 border border-line bg-panel/90 text-foreground shadow-sm hover:bg-accent"
        >
          <Expand aria-hidden="true" />
        </Button>
      </div>
      <figcaption className={compact ? "pt-3" : "pt-4"}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 font-display text-lg font-semibold uppercase leading-tight sm:text-xl">{artwork.title}</h3>
          <Badge variant="outline" className="shrink-0 border-coral/35 bg-coral/10 text-[9px] text-coral">Reference only</Badge>
        </div>
        {!compact && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{artwork.note}</p>}
        <p className="mt-2 break-words text-[10px] text-muted-foreground">{artwork.source}</p>
        {artwork.assignmentPending && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase text-gold">
            <span className="size-1.5 rounded-full bg-gold" />
            Awaiting roster verification
          </p>
        )}
      </figcaption>
    </figure>
  );
}

function PalettePanel() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase text-muted-foreground">Direction palette</p>
        <span className="text-[9px] uppercase text-muted-foreground">Approximate</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {palette.map((swatch) => (
          <div key={swatch.label} className="min-w-0">
            <div className={`h-10 border border-line ${swatch.className}`} />
            <p className="mt-1.5 truncate text-[10px] font-semibold">{swatch.label}</p>
            <p className="truncate text-[9px] text-muted-foreground">{swatch.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TraitNote({
  tone,
  title,
  traits,
}: {
  tone: "aqua" | "neon-rose";
  title: string;
  traits: string;
}) {
  const toneClass = tone === "aqua" ? "border-aqua text-aqua" : "border-neon-rose text-neon-rose";

  return (
    <div className={`border-l-2 pl-3 ${toneClass}`}>
      <p className="text-[10px] font-semibold uppercase">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{traits}</p>
    </div>
  );
}

function GuidanceNote({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="border-y border-line py-5">
      <p className="text-[10px] font-semibold uppercase text-coral">{eyebrow}</p>
      <h3 className="mt-3 max-w-lg font-display text-2xl font-semibold uppercase leading-tight">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

function ProductionRow({
  number,
  title,
  text,
  tag,
}: {
  number: string;
  title: string;
  text: string;
  tag: string;
}) {
  return (
    <article className="grid gap-3 border-b border-line py-5 last:border-b-0 md:grid-cols-[44px_minmax(0,1fr)_132px] md:items-start">
      <span className="font-display text-lg text-neon-rose">{number}</span>
      <div>
        <h3 className="font-display text-xl font-semibold uppercase leading-tight">{title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
      <Badge variant="outline" className="w-fit border-gold/35 bg-gold/10 text-[9px] text-gold">{tag}</Badge>
    </article>
  );
}
