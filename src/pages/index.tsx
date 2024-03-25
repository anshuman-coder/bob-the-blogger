import { PageHelmet, PageBox } from '~/components/global';
import { MainSection, SideSection } from '~/components/dashboard'

export default function Home() {

  return (
    <>
      <PageHelmet title='Bob | Login' />
      <PageBox>
        <MainSection />
        <SideSection />
      </PageBox>
    </>
  );
}
