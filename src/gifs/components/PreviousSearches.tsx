interface Props {
    title: string;
    searches: string[]
    onLableClick: (term: string) => void //*Comunicacion entre componentes 2*/
}

export const PreviousSearches = ({ title, searches, onLableClick }: Props) => {
    return (
        <div className="previous-searches">
            <h2>{title}</h2>
            <ul className="previous-searches-list">
                {searches.map((term) => (
                    <li key={term}
                        onClick={() => onLableClick(term)} //*Comunicacion entre componentes 3*/
                    >{term}</li>
                ))}
            </ul>
        </div>
    )
}
