import { adultWords } from 'adults-list'

export function containsBadWord(text) {

    const lowercasedText = text.toLowerCase();


    for (let i = 0; i < adultWords.length; i++) {

        const lowercasedBadWord = adultWords[i].toLowerCase();


        if (lowercasedText.includes(lowercasedBadWord)) {

            return true;
        }
    }

    // If no bad words are found, return false
    return false;
}