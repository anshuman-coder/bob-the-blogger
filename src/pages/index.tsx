import { PageHelmet, PageBox } from '~/components/global';
import { MainSection, SideSection } from '~/components/dashboard'
import { useSession } from 'next-auth/react';

export default function Home() {

  const { status, data } = useSession()
  return (
    <>
      <PageHelmet title={`Bob | ${data?.user?.name ?? 'Login'}`} />
      <PageBox
        className='overflow-hidden'
        isLoading={Boolean(status === 'loading')}
      >
        <MainSection />
        <SideSection />
      </PageBox>
    </>
  );
}
