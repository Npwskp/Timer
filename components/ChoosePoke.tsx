import { getAllPokemon } from "@/service/evolution";
import React, { use, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CiSquarePlus } from "react-icons/ci";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PokeCard from "./PokeCard";
import { useScreenSize } from "@/hook/useScreenSize";
import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ChoosePokeProps = {
  name: string;
  setName: (name: string) => void;
};

type Pokemon = {
  name: string;
  url: string;
};

const ChoosePoke: React.FC<ChoosePokeProps> = ({ name, setName }) => {
  const [pokeList, setPokeList] = useState<string[]>([]);
  const [showPokeList, setShowPokeList] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const screenSize = useScreenSize();
  const img = useGetPokemonPic({ name, pictype: "Icon" });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await getAllPokemon();
      const pokeData = res.map((poke: Pokemon) => poke.name);
      setPokeList(pokeData);
    };
    getPokemon();
  }, []);

  useEffect(() => {
    if (input === "") {
      setShowPokeList(pokeList);
    } else {
      const filterPoke = pokeList.filter((poke) =>
        poke.toLowerCase().includes(input.toLowerCase())
      );
      setShowPokeList(filterPoke);
    }
  }, [input, pokeList]);

  if (pokeList.length === 0 && input === "") return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-row">
        <Dialog key={1}>
          <div className="flex flex-row">
            <DialogTrigger asChild className="transition-all">
              <Button className="m-auto p-auto sm:w-[160px] w-[120px] h-[50px] bg-primary">
                <div className="flex flex-row gap-2 justify-center items-center">
                  <div className="text-wrap">Choose Pokemon</div>
                </div>
              </Button>
            </DialogTrigger>
            <div
              className={cn("m-auto px-3", {
                hidden: name === "",
              })}
            >
              {name ? (
                <div className="flex flex-row justify-center items-center relative gap-3">
                  <div className="text-wrap sm:text-base text-sm">{name}</div>
                  <Image
                    src={img?.toString() || "/pokeball.png"}
                    width={60}
                    height={60}
                    alt="pokeIcon"
                    className="object-contain bg-primary"
                  />
                  <Image
                    src={"/frame.png"}
                    width={67}
                    height={67}
                    alt="pokeDex"
                    className="object-contain absolute -z-10 right-[-3px] top-[-5px]"
                  />
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
          <DialogContent className="transition-all duration-300">
            <DialogHeader>
              <DialogTitle>Choose Pokemon to collect</DialogTitle>
            </DialogHeader>
            <div className="h-[60vh] overflow-auto flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Search Pokemon"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
              />
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList
                    height={height - 50}
                    itemCount={showPokeList.length / 2}
                    itemSize={screenSize.width > 600 ? 350 : 250}
                    width={width}
                  >
                    {({ index, style }) => (
                      <div style={style} key={index}>
                        <div className="flex flex-row gap-2">
                          <PokeCard
                            name={showPokeList[2 * index]}
                            setPokemon={setName}
                          />
                          <PokeCard
                            name={showPokeList[2 * index + 1]}
                            setPokemon={setName}
                          />
                        </div>
                      </div>
                    )}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ChoosePoke;
