const API_KEY = "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";

export async function isCommentOffensive(comment) {
    const response = await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            // prompt: "give a random example of programming language",
            prompt: `Calificame este comentario si es ofensivo devuelveme solo un 1 sí representa que es un comentario ofensivo y 0 que es un comentario que NO tiene odio. El comentario es "${comment}"`,
            max_tokens: 20,
        }),
    });

    const data = await response.json();
    const responseInNumber = parseInt(data.choices[0].text.replace(/\D/g, ''), 10)
    console.log(Boolean(responseInNumber))
    return Boolean(responseInNumber)
}





