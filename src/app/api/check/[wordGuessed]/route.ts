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

export async function GET(request: Request, context: any) {
    const { params } = context;
    const wordGuessed = params.wordGuessed;
    console.log(wordGuessed);
    const date = new Date();
    const UTCDate = date.getUTCMonth().toString() + date.getUTCDay().toString() + date.getUTCFullYear().toString();
    const wordIndex = hashCode(UTCDate) % 12484;
    const word = words.at(wordIndex);
    const correctness = []
    if (wordGuessed) {
        for (let i = 0; i < 5; i++) {
            if (word != undefined && word[i] === wordGuessed[i]) {
                correctness.push("green")
            } else {
                correctness.push("gray")
            }
        }
    }
    console.log(UTCDate);
    console.log(word);
    return NextResponse.json({ word: word, correctness: correctness });
}