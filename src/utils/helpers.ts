export async function checkWord(word: string): Promise<null | string[]> {
    try {
        const response = await fetch("/api/check/" + word)
        const data = await response.json();
        return data.correctness;
    } catch (err) {
        console.log("error checking word", err);
        return null;
    }

}