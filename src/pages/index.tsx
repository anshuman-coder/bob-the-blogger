import { PageHelmet, PageBox } from '~/components/global';
import { MainSection } from '~/components/dashboard'

export default function Home() {

  return (
    <>
      <PageHelmet title='Bob | Login' />
      <PageBox>
        <MainSection />
        <aside className='col-span-4'>
          this is side Section
        </aside>
      </PageBox>
    </>
  );
}
