import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components";
import NextNProgress from "nextjs-progressbar";
import { AuthContextProvider } from "context/AuthContext";
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthContextProvider>
        <NextNProgress
          color="#E50914"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </RecoilRoot>
  );
}

export default MyApp;
