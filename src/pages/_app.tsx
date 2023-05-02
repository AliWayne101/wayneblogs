import '@/scss/index.scss';
import type { AppProps } from 'next/app'
import { Fira_Code, Raleway } from 'next/font/google';
import Router from 'next/router';
import NProgress from 'nprogress';
import "nprogress/nprogress";

const raleway = Raleway({ subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function App({ Component, pageProps }: AppProps) {

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  Router.events.on('routeChangeError', ()=> {
    NProgress.done();
  })


  return (
    <>
      <style jsx global>{`
        :root {
          --raleway: ${raleway.style.fontFamily};
          --fira-code: ${firaCode.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
