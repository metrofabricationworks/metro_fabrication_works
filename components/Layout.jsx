import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = "Metro Fabrication Works - Vijayawada" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Professional fabrication services in Vijayawada - Rolling Shutters, Doors, Gates, Grills, Staircases & Welding Works" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}