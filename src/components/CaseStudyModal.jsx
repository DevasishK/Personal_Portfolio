import Modal from './Modal.jsx'

function Block({ title, children }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>
    </div>
  )
}

export default function CaseStudyModal({ open, onClose, project }) {
  const cs = project?.caseStudy
  return (
    <Modal open={open} onClose={onClose} title={project ? `${project.title} — Case Study` : 'Case Study'}>
      {!project || !cs ? (
        <div className="text-sm text-gray-600 dark:text-gray-400">No case study content yet.</div>
      ) : (
        <div className="space-y-6">
          <Block title="Problem">{cs.problem}</Block>
          <Block title="Approach / Architecture">{cs.approach}</Block>

          <div className="grid gap-6 md:grid-cols-2">
            <Block title="Technologies">
              <div className="mt-1 flex flex-wrap gap-2">
                {cs.technologies.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </Block>
            <Block title="Key challenges">
              <ul className="list-disc space-y-1 pl-5">
                {cs.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Block>
          </div>

          <Block title="What I learned">{cs.learned}</Block>
        </div>
      )}
    </Modal>
  )
}

