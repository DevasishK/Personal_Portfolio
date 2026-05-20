import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
const CaseStudyModalLazy = lazy(() => import('../components/CaseStudyModal.jsx'))
import Modal from '../components/Modal.jsx'
const ResumePreviewLazy = lazy(() => import('../components/ResumePreview.jsx'))
import PageTransition from '../components/PageTransition.jsx'
import { MODES, useMode } from '../context/ModeContext.jsx'
const AboutLazy = lazy(() => import('../sections/About.jsx'))
const StrengthsLazy = lazy(() => import('../sections/Strengths.jsx'))
const ExperienceLazy = lazy(() => import('../sections/Experience.jsx'))
const SkillsToolsLazy = lazy(() => import('../sections/SkillsTools.jsx'))
const ProjectsProLazy = lazy(() => import('../sections/ProjectsPro.jsx'))
const CertificationsLazy = lazy(() => import('../sections/Certifications.jsx'))
const ResearchLazy = lazy(() => import('../sections/Research.jsx'))
const EducationLazy = lazy(() => import('../sections/Education.jsx'))
const FAQLazy = lazy(() => import('../components/FAQ.jsx'))
const ContactLazy = lazy(() => import('../sections/Contact.jsx'))
import ProHeroSplit from '../sections/ProHeroSplit.jsx'
import { professionalData } from '../utils/sampleData.js'

function SectionSkeleton({ className = 'h-64' }) {
  return <div className={`w-full animate-pulse rounded-2xl bg-black/5 dark:bg-white/10 ${className}`} />
}

export default function Professional() {
  const { setMode } = useMode()
  const [activeProject, setActiveProject] = useState(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    setMode(MODES.professional)
  }, [setMode])

  const data = professionalData
  const videoTitle = useMemo(() => 'Intro video', [])

  return (
    <PageTransition>
      <div className="w-full">
        <ProHeroSplit onPlayVideo={() => setVideoOpen(true)} onPreviewResume={() => setResumeOpen(true)} />

        <section className="w-full border-t border-black/5 py-10 dark:border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">Short on time? Start here</div>
              <ol className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                <li>1. Explore my work</li>
                <li>2. See my experience</li>
                <li>3. Decide if we should connect</li>
              </ol>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a className="btn-ghost w-full sm:w-auto" href="#projects">
                View Projects
              </a>
              <a className="btn-ghost w-full sm:w-auto" href="#experience">
                View Experience
              </a>
              <a className="btn-primary w-full sm:w-auto" href={data.resumeUrl} download>
                <Download className="h-4 w-4" /> Download CV
              </a>
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton />}>
          <AboutLazy data={data.about} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <StrengthsLazy items={data.strengths} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceLazy items={data.experience} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton className="h-80" />}>
          <SkillsToolsLazy data={data.skillsGrouped} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton className="h-96" />}>
          <ProjectsProLazy featured={data.projectsFeatured} other={data.projectsOther} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton className="h-72" />}>
          <CertificationsLazy data={data.certifications} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton className="h-72" />}>
          <ResearchLazy items={data.research} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton className="h-72" />}>
          <EducationLazy items={data.education} />
        </Suspense>

        <section id="faq" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            <div className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">FAQ</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                Recruiter questions
              </h2>
              <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">The questions recruiters actually ask.</p>
            </div>
            <div className="mt-8">
              <Suspense fallback={<SectionSkeleton className="h-72" />}>
                <FAQLazy items={data.faq} />
              </Suspense>
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton className="h-96" />}>
          <ContactLazy variant="professional" />
        </Suspense>

        <motion.div
          className="py-10 text-center text-xs text-zinc-500 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Deployment-ready: Vite + React Router + Tailwind + Supabase.
        </motion.div>
      </div>

      <Suspense fallback={null}>
        <CaseStudyModalLazy open={Boolean(activeProject)} onClose={() => setActiveProject(null)} project={activeProject} />
      </Suspense>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} title={videoTitle} maxWidthClass="max-w-3xl">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
          <iframe
            className="h-full w-full"
            src={data.introVideo.embedUrl}
            title="Intro video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        title="Resume preview"
        maxWidthClass="max-w-4xl"
        embedFriendly
      >
        {resumeOpen ? (
          <Suspense
            fallback={
              <div className="flex h-[75vh] min-h-[420px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
                Loading resume…
              </div>
            }
          >
            <ResumePreviewLazy src={data.resumePreviewUrl} downloadUrl={data.resumeUrl} className="h-[75vh]" />
          </Suspense>
        ) : null}
        <div className="mt-4">
          <a className="btn-primary" href={data.resumeUrl} download>
            <Download className="h-4 w-4" /> Download
          </a>
        </div>
      </Modal>
    </PageTransition>
  )
}

