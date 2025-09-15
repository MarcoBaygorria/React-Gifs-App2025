import { GifsList } from "./gifs/components/GifsList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from "./shared/components/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {

    const { gifs, handleSearch, handleTermClick, previousTerms } = useGifs()

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




