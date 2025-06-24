import { useEffect, useState } from "react"

export const RegexTextTesterViewModel = (Pattern: string, TextTest: string) => {
const [matches, setMatches] = useState<string[]>([]);
    useEffect(() => {
        try{
        const regex = new RegExp(Pattern, 'g');
        const found = TextTest.match(regex);
        setMatches(found || []);
        } catch (error){
            setMatches([]);
            console.warn('Error al encontrar coincidencias', error)
        }
    }, [Pattern, TextTest]);
    return matches; 
}