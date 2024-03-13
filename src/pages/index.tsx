import PageBox from '~/components/global/PageBox';
import PageHelmet from '~/components/global/PageHelmet';

export default function Home() {

  return (
    <>
      <PageHelmet title='Bob | Login' />
      <PageBox>
        <main className='col-span-8 border-r border-black'>
          this is main section
        </main>
        <aside className='col-span-4'>
          this is side Section
        </aside>
      </PageBox>
    </>
  );
}
