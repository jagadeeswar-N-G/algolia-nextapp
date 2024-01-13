import Plp from "@/components/Plp";
import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import { GetServerSideProps } from "next";
import Head from "next/head";
import singletonRouter from "next/router";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  SearchBox,
  InstantSearchServerState,
  InstantSearchSSRProvider,
  getServerState,
  Configure,
  Pagination,
} from "react-instantsearch";
import { createInstantSearchRouterNext } from "react-instantsearch-router-nextjs";

const client = algoliasearch("AOQGRJVH8S", "f64dcf0cac3e2258c4049f4e2bd0d250");

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: any) {
  return (
    <>
     
      <Configure hitsPerPage={12} />
      <Plp hit = {hit} />
    </>
  );
}

type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

export default function HomePage({ serverState, url }: HomePageProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <Head>
        <title>React InstantSearch - Next.js</title>
      </Head>

      <InstantSearch
        searchClient={client}
        indexName="Products"
        routing={{
          router: createInstantSearchRouterNext({
            serverUrl: url,
            singletonRouter,
          }),
        }}
        insights={true}
      >
        
          <div>
            <div className="flex items-center justify-center">
            <SearchBox />
            </div>
            
            <Hits  hitComponent={Hit} />
             <Pagination/>
          
            
          </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async function getServerSideProps({ req }) {
    const protocol = req.headers.referer?.split("://")[0] || "https";
    const url = `${protocol}://${req.headers.host}${req.url}`;
    const serverState = await getServerState(<HomePage url={url} />, {
      renderToString,
    });
    return {
      props: {
        serverState,
        url,
      },
    };
  };
