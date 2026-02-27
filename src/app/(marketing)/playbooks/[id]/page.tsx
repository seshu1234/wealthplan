import { notFound } from 'next/navigation'
import { PLAYBOOKS } from '@/lib/playbooks/scenarios'
import { PlaybookWizard } from '@/components/playbooks/PlaybookWizard'

export async function generateStaticParams() {
  return Object.keys(PLAYBOOKS).map((id) => ({
    id,
  }))
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const scenario = PLAYBOOKS[id]

  if (!scenario) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <PlaybookWizard scenario={scenario} />
    </div>
  )
}
