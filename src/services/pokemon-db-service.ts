import { CapturedPokemon } from "@/models/pokemon-db";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { collection } from "firebase/firestore";

function pokemonsOf(uid: string) {
  return collection(db, "users", uid, "capturedPokemons");
}

export async function addCapturedPokemon(
  uid: string,
  pokemon_id: number,
  description: string,
) {
  await setDoc(doc(pokemonsOf(uid), String(pokemon_id)), {
    description,
  });
}

export async function updateCapturedPokemon() {}
