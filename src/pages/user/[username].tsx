import { useRouter } from 'next/router'
import { PageBox, PageHelmet } from '~/components/global'
import { ProfileCard } from '~/components/user'
import { UserRouterReturnType } from '~/components/user/ProfileCard'
import { api } from '~/utils/api'

export default function Profile() {

  const router = useRouter()
  const { data: profile, isLoading } = api.user.getProfile.useQuery({ username: (router.query?.username ?? '') as string })

  return (
    <>
      <PageHelmet title={`Author | ${router.query?.username}`} />
      <PageBox isLoading={isLoading}>
        <div className='w-full h-full col-span-full flex flex-col justify-start items-center mx-auto lg:max-w-screen-lg xl:max-w-screen-xl pt-20'>
          <ProfileCard profile={profile as UserRouterReturnType} />
        </div>
      </PageBox>
    </>
  )
}