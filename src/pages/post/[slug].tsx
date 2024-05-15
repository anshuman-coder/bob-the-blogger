import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { PageBox, PageHelmet } from '~/components/global'

export default function Post() {
  const router = useRouter()

  const { status } = useSession()

  return (
    <>
      <PageHelmet title={`Post | ${router?.query?.slug as string ?? ''}`} />
      <PageBox isLoading={Boolean(status === 'loading')}>
        Anshuman
      </PageBox>
    </>
  )
}