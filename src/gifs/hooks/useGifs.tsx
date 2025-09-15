import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";



export const useGifs = () => {

    const [gifs, setGifs] = useState<Gif[]>([])
    const [previousTerms, setPreviousTerms] = useState<string[]>([])

    const gifsCache = useRef<Record<string, Gif[]>>({})

    //* Comunicacion entre componentes \ MUY IMPORTANTE 1
    const handleTermClick = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    }

    //*Comunacion entre componentes Serch*/
    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase(); //poner en minusculas y eliminar espacios.
        if (query.length === 0) return; //validacion de que el query no este vacio

        if (previousTerms.includes(query)) return; //evitar duplicados.

        setPreviousTerms([query, ...previousTerms].splice(0, 8));

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);

        gifsCache.current[query] = gifs;
    }

    return {
        //values
        gifs,
        previousTerms,
        //metodos

        handleTermClick,
        handleSearch,
    }
}
