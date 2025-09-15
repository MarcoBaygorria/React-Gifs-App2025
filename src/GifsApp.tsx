import { useState } from "react";
import { GifsList } from "./gifs/components/GifsList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {

    const [gifs, setGifs] = useState<Gif[]>([])
    const [previousTerms, setPreviousTerms] = useState<string[]>([])

    //* Comunicacion entre componentes \ MUY IMPORTANTE 1
    const handleTermClick = (term: string) => {
        console.log({ term });
    }

    //*Comunacion entre componentes Serch*/
    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase(); //poner en minusculas y eliminar espacios.
        if (!query) return //validacion de que el query no este vacio

        if (previousTerms.includes(query)) return; //evitar duplicados.

        setPreviousTerms((prev) => {
            const updated = [query, ...prev];
            return updated.slice(0, 8);
        });

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);
    }

    return (
        <>
            {/* Header */}
            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte tu Gif"
            />

            {/* Search */}
            <SearchBar
                placeholder="Buscar Gifs"
                onQuery={handleSearch}
            />

            {/* Busquedas previas */}
            <PreviousSearches
                title="Busquedas Previas"
                searches={previousTerms}
                onLableClick={handleTermClick} //*Comunicacion entre componentes 4*/
            />

            {/* Mostrar gifs */}
            <GifsList gifs={gifs} />
        </>
    )
}




