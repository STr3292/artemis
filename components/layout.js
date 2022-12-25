import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import packageJson from "../package.json"
import Vivus from "vivus";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    new Vivus('uebitLogoLine', {
      duration: 20,
      type: "delayed",
      start: "autostart",
    }, function () {
      const fill = document.getElementById("uebitLogoFace");
      const stroke = document.getElementById("uebitLogoLine");
      fill.style.fillOpacity = "1";
      stroke.style.strokeWidth = "0";
    });
  });

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <meta charset="UTF-8" />
        <link rel="icon" href="./favicons/favicon.ico" />
        <link rel="icon" href="./favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="./favicons/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="STr3292" />
        <meta name="keywords" content="ARtemis,STr3292" />
        <meta name="og:url" content="" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="ARtemis" />
        <meta name="og:title" content="ARtemis" />
        <meta name="og:image" content="https://i.gyazo.com/9f43b2ec371503a7fc2836d43249e1a5.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@STr3292" />
        <meta name="theme-color" content="#050D28" />
      </Head>

      <header className="fixed w-full h-11 py-3 backdrop-blur-md bg-gray/20 hover:backdrop-blur-xl active:bg-iRed text-cyberBlue">
        <nav className="mx-auto max-w-screen-md">
          <h1 id="uebitLogo" className="mx-2">
            <Link href="./">
              <svg id="uebitLogoLine" width="100%" height="100%" viewBox="0 0 1967 492"
                className="h-5 w-20 stroke-cyberBlue stroke-round hover:stroke-white">
                <path id="U2l" d="M309.359,482.817l-45.048,0l236.385,-474.114l90.096,-0" />
                <path id="U2r" d="M309.359,482.817l45.048,0l236.385,-474.114l-90.096,-0" />
                <path id="U1r" d="M281.999,402.187l-117.114,0l-39.006,-62.91l164.819,-330.574l-90.096,-0" />
                <path id="U1l" d="M281.999,402.187l-40.2,80.63l-117.017,0l-88.999,-143.54l164.819,-330.574" />
                <path id="E1t" d="M573.103,89.333l40.201,-80.63l277.582,-0" />
                <path id="E1b" d="M573.103,89.333l277.582,-0l40.201,-80.63" />
                <path id="E2t" d="M480.033,276.002l40.201,-80.63l277.582,-0" />
                <path id="E2b" d="M480.033,276.002l277.582,-0l40.201,-80.63" />
                <path id="E3t" d="M376.919,482.817l40.2,-80.63l277.582,0" />
                <path id="E3b" d="M376.919,482.817l277.582,0l40.2,-80.63" />
                <path id="B1t" d="M690.933,482.817l236.385,-474.114l390.189,-0" />
                <path id="B1b"
                  d="M690.933,482.817l90.096,0l103.114,-206.815l187.486,-0l40.201,-80.63l-187.486,-0l52.869,-106.039l300.094,-0l40.2,-80.63" />
                <path id="B2t" d="M803.541,482.817l40.2,-80.63l187.486,0l145.939,-292.708l90.096,0" />
                <path id="B2b" d="M803.541,482.817l277.582,0l186.139,-373.338" />
                <path id="It" d="M1103.63,482.817l40.2,-80.63l43.631,0l196.184,-393.484l133.727,-0" />
                <path id="Ib" d="M1103.63,482.817l133.726,0l196.184,-393.484l43.631,-0l40.201,-80.63" />
                <path id="Tt" d="M1499.91,89.333l40.201,-80.63l390.19,-0" />
                <path id="Tb"
                  d="M1499.91,89.333l150.047,-0l-196.184,393.484l90.096,0l196.184,-393.484l150.047,-0l40.201,-80.63" />
              </svg>
              <svg id="uebitLogoFace" width="100%" height="100%" viewBox="0 0 1967 492"
                className="h-5 w-20 fill-cyberBlue hover:fill-white">
                <path id="U2" d="M590.792,8.703l-90.096,-0l-236.385,474.114l90.096,0l236.385,-474.114Z" />
                <path id="U1"
                  d="M200.602,8.703l-164.819,330.574l88.999,143.54l117.017,0l40.2,-80.63l-117.114,0l-39.006,-62.91l164.819,-330.574l-90.096,-0Z" />
                <path id="E1" d="M613.304,8.703l-40.201,80.63l277.582,-0l40.201,-80.63l-277.582,-0Z" />
                <path id="E2" d="M520.234,195.372l-40.201,80.63l277.582,-0l40.201,-80.63l-277.582,-0Z" />
                <path id="E3" d="M417.119,402.187l-40.2,80.63l277.582,0l40.2,-80.63l-277.582,0Z" />
                <path id="B2"
                  d="M803.541,482.817l277.582,0l186.139,-373.338l-90.096,0l-145.939,292.708l-187.486,0l-40.2,80.63Z" />
                <path id="B1"
                  d="M690.933,482.817l90.096,0l103.114,-206.815l187.486,-0l40.201,-80.63l-187.486,-0l52.869,-106.039l300.094,-0l40.2,-80.63l-390.189,-0l-236.385,474.114Z" />
                <path id="I"
                  d="M1143.84,402.187l-40.2,80.63l133.726,0l196.184,-393.484l43.631,-0l40.201,-80.63l-133.727,-0l-196.184,393.484l-43.631,0Z" />
                <path id="T"
                  d="M1540.11,8.703l-40.201,80.63l150.047,-0l-196.184,393.484l90.096,0l196.184,-393.484l150.047,-0l40.201,-80.63l-390.19,-0Z" />
              </svg>
            </Link>
          </h1>
          <ul className="flex justify-end mx-1 text-center text-sm font-mono">
            <li>
              <Link href="" className="block w-16 sm:w-20 mx-1 rounded hover:bg-white/20 hover:text-white">
                ARtemis
              </Link>
            </li>
            <li>
              <Link href="" className="block w-16 sm:w-20 mx-1 rounded hover:bg-white/20 hover:text-white">
                ARtemis
              </Link>
            </li>
            <li>
              <Link href="" className="block w-16 sm:w-20 mx-1 rounded hover:bg-white/20 hover:text-white">
                ARtemis
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="w-full mx-auto max-w-screen-md pt-11 text-base">
        {children}
      </main>
      <footer className="w-full mx-auto text-right mt-8 pt-1 pb-2 select-none">
        <p className="text-gray mx-2">
          <Link href="https://github.com/STr3292/artemis" className="italic font-mono">
            Now running&nbsp;
            <span className="">
              ARtemis_v{packageJson.version}
            </span>
          </Link>
        </p>
      </footer>
    </div>
  )
}
