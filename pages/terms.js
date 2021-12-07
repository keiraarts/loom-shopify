import Head from "next/head";
import ReactMarkdown from "react-markdown";
import privacy from "../public/PRIVACY";
import terms from "../public/TERMS.js";

function Home() {
  return (
    <>
      <Head>
        <title className="px-2 py-3 text-white bg-brand-forest">
          Terms of Service
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="noindex" />
        <meta httpEquiv="cache-control" content="max-age=0" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta httpEquiv="pragma" content="no-cache" />
      </Head>
      <div className="bg-brand-yellow">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="inline-block px-4 py-2 text-base font-semibold leading-6 tracking-wide text-white uppercase rounded-full bg-logo-magenta">
              Terms of Service
            </h1>
            <p className="mt-1 text-4xl font-extrabold leading-10 text-black sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
              Transparency matters
            </p>
            <p className="max-w-xl mx-auto mt-5 text-xl leading-7 text-black">
              Read our privacy policy & terms to learn how viaGlamour (sponsor
              of DisputeCore) protects your data and what you should expect from
              our services. If you have questions send us an email to
              hey@viaglamour.com <br />
            </p>
          </div>
        </div>
      </div>

      <div className="relative py-16 overflow-hidden bg-white ">
        <div className="relative max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <article className="mx-auto prose lg:prose-xl">
            <ReactMarkdown source={privacy} />
            <ReactMarkdown source={terms} />
          </article>
        </div>
      </div>
    </>
  );
}

export default Home;
