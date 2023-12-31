import { NextResponse } from "next/server";
import words from "../../../../utils/words.json";

function hashCode(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
interface IDictionary<TValue> {
    [id: string]: TValue;
}

function getFrequency(str: string | undefined) {
    if (str === undefined) { return {} }
    const freq: IDictionary<number> = {};
    for (let i = 0; i < 5; i++) {
        if (freq[str[i]]) {
            freq[str[i]]++;
        } else {
            freq[str[i]] = 1;
        }
    }
    return freq;
}

export async function GET(request: Request, context: any) {
    const { params } = context;
    const wordGuessed = params.wordGuessed;
    // TODO: check if wordGuessed is 5 letters long
    console.log(wordGuessed);
    const date = new Date();
    const UTCDate = date.getUTCMonth().toString() + date.getUTCDay().toString() + date.getUTCFullYear().toString();
    const wordIndex = hashCode(UTCDate) % 12484;
    const word = words.at(wordIndex)?.toUpperCase();
    const freq = getFrequency(word);
    const correctness = [];
    if (wordGuessed) {
        for (let i = 0; i < 5; i++) {
            if (word != undefined) {
                if (word[i] === wordGuessed[i]) {
                    correctness.push("green")
                    freq[word[i]]--;
                    // TODO: fix backend logic
                } else if (word.includes(wordGuessed[i])) {
                    correctness.push("yellow");
                } else {
                    correctness.push("gray")
                }
            }
        }
    }
    console.log(UTCDate);
    console.log(word);
    return NextResponse.json({ word: word, correctness: correctness });
}