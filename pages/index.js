import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Styles from '../styles/Home.module.css'
import Script from 'next/script'
import Layout from '../components/layout'
import React from 'react'
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const testUrl = "https://www.google.co.jp/maps/@34.9820087,135.9636416,3a,75y,51.65h,73.85t/data=!3m7!1e1!3m5!1ssHzGmVJRwtca-jKjIludLg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DsHzGmVJRwtca-jKjIludLg%26cb_client%3Dmaps_sv.tactile.gps%26w%3D203%26h%3D100%26yaw%3D106.41038%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656";
  const [url, setUrl] = useState(testUrl);
  const [viewId, setViewId] = useState("");
  const [viewImagePath, setViewImagePath] = useState("");

  function darkroom(diff) {
    diff.preventDefault();
    const postData = async () => {
      const data = {
        url: url,
      };
      const response = await fetch("/api/streetview-dlside", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then((data) => {
      setViewId(data.viewId);
      setViewImagePath("/panorama/" + viewId + ".png");
      console.log(viewImagePath);
    });
  }

  return (
    <div>
      <Head>
        <title>ARtemis</title>
        <meta name="description" content="DAWN PAGE" />
      </Head>
      <Layout>
        <article className="pt-2 pb-16 mx-1">
          <section className="pb-4">
            <h1 className="">
              ARtemis&nbsp;
              <span className="italic text-xl font-thin">
                &quot;reality is the only thing that&apos;s real&quot;
              </span>
            </h1>
          </section>

          <section>
            <form onSubmit={darkroom}>
              <label className="mb-2 text-sm font-medium text-white sr-only dark:text-white">Search</label>
              <div className="relative">
                <input type="url" id="streetviewUrl" value={url} onChange={(diff) => setUrl(diff.target.value)} className="block w-full p-4 pl-4 pr-24 text-sm text-white border border-cyberYellow rounded-lg bg-gray/20 focus:ring-cyberYellow focus:border-cyberYellow" placeholder="Google Street View URL" required></input>
                <button type="submit" id="submitButton" className="text-darkblue absolute right-2.5 bottom-2.5 bg-cyberYellow hover:bg-cyberYellow/70 focus:ring-4 focus:outline-none focus:ring-cyberYellow/50 font-mono rounded-lg text-sm px-4 py-2">READY</button>
              </div>
            </form>
            <div className="my-4">
              <Image alt="Google Street View Panorama Image" src={viewImagePath} width="800" height="400" />
            </div>
          </section>

          <section>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </section>

          <section>
            <div className="bg-gray/20 py-4 px-2 rounded-md">
              <pre>
                <code>
                  <div className="flex flex-row-reverse mx-4 text-nand-default italic">
                    debugger
                  </div>
                  <br />
                  {JSON.stringify({
                    url: url,
                    viewId: viewId,
                  }, null, 2)}
                </code>
              </pre>
            </div>
          </section>
        </article>
      </Layout>
    </div >
  )
}
