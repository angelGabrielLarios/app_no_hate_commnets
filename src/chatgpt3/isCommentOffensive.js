import { openAI } from "./openAI.js";

export async function isCommentOffensive(comment = 'hola') {
    try {
        const completion = await openAI.chat.completions.create({
            messages: [{ role: "system", content: `Calificame este comentario si es ofensivo devuelveme solo un 1 sí representa que es un comentario ofensivo y 0 que es un comentario que NO tiene odio. El comentario es "${comment}"` }],
            model: "gpt-3.5-turbo",
        });

        const { message: { content } } = completion.choices[0]
        /* comentarios */
        const response = Boolean(Number(content))
        return response

    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}




