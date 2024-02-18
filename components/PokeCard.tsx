import React, { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { getPokemonSprites } from "@/service/evolution";
import { DialogClose } from "./ui/dialog";
import Image from "next/image";
import { useScreenSize } from "@/hook/useScreenSize";

type PokeCardProps = {
  name: string;
  setPokemon: (name: string) => void;
};

const PokeCard: React.FC<PokeCardProps> = ({ name, setPokemon }) => {
  const [image, setImage] = useState<string>("");
  const screenSize = useScreenSize();

  useEffect(() => {
    const getPokemonPic = async () => {
      const res = await getPokemonSprites(name);
      setImage(res?.other["official-artwork"].front_default || "");
    };
    getPokemonPic();
  }, [name]);

  return (
    <Card
      className={cn("flex-1 h-[99%] shadow-md dark:shadow-gray-800", {
        invisible: !name,
      })}
    >
      <CardHeader>
        <CardTitle className="m-auto text-lg sm:text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="items-center">
        <Image
          src={image}
          width={screenSize.width > 600 ? 200 : 100}
          height={screenSize.width > 600 ? 200 : 100}
          alt="pokemon"
        />
      </CardContent>
      <CardFooter>
        <DialogClose className="w-full">
          <Button
            className="w-full"
            onClick={() => setPokemon(name)}
            variant="secondary"
          >
            Select
          </Button>
        </DialogClose>
      </CardFooter>
    </Card>
  );
};

export default PokeCard;
