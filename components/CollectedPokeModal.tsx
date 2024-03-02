import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import PokeCard from "./PokeCard";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";

type CollectedPokeModalProps = {
  open: boolean;
  onClose: () => void;
  pokemon: string;
};

const CollectedPokeModal: React.FC<CollectedPokeModalProps> = ({
  open: isOpen,
  onClose,
  pokemon,
}) => {
  const pokepic = useGetPokemonPic({ name: pokemon, pictype: "Gif" });

  return (
    <Dialog open={isOpen}>
      <DialogContent className="flex items-center flex-row justify-around">
        <DialogTitle>{pokemon} Collected!</DialogTitle>
        <div className="">Congratulations</div>
        <Image
          src={pokepic?.toString() || "/pokeball.png"}
          alt={pokemon}
          width={80}
          height={80}
          className="object-contain w-[80px] h-[80px] grid place-items-center"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CollectedPokeModal;
