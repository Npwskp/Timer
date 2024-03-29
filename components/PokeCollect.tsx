"use client";

import React, { useEffect, useState } from "react";
import { usePokeListStore } from "@/app/LandingPage";
import CollectedCard from "./CollectedCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "@/lib/utils";

const PokeCollect = () => {
  const pokemonList = usePokeListStore((state) => state.pokeList);
  // const [parent, setParent] = useAutoAnimate();

  useEffect(() => {
    console.log(pokemonList);
  }, [pokemonList]);

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="block">
        <div className="text-center font-semibold text-xl my-4" id="step3">
          Pokemon Collected Today
        </div>
        <div
          // ref={parent}
          className="grid md:grid-cols-5 grid-cols-3 auto-rows-min gap-1 grid-flow-row overflow-auto lg:w-[30vw] md:[50vw] w-[80vw] h-[50dvh] border-accent m-auto border-2 rounded-lg bg-secondary mb-4 p-1 transition-transform duration-500"
        >
          {pokemonList.map((poke, index) => {
            return (
              <div key={poke}>
                <CollectedCard name={poke} idx={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeCollect;
