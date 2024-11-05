import Image from "next/image";
import { TriviaLayoutComponent } from "@/components/trivia-layout";

export default async function Home({
    params,
}: {
    params: Promise<{ topic: string }>;
}) {
    function shuffle(array: Array<any>) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
    }

    const { topic } = await params;

    const questions = await fetch(`http://localhost:8080/questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: topic }),
    }).then((res) => res.json());

    shuffle(questions);

    return <TriviaLayoutComponent questions={questions} topic={topic} />;
}
