"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";

export function TriviaLayoutComponent({
    questions,
    topic,
}: {
    questions: { question: string; options: string[]; correct: string }[];
    topic?: string;
}) {
    // This would be managed by state in a real application
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const totalQuestions = React.useMemo(() => questions.length, [questions]);
    const progress = React.useMemo(
        () => (currentQuestion / (totalQuestions - 1)) * 100,
        [currentQuestion, totalQuestions]
    );

    return (
        <>
            <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>
                                Question {currentQuestion + 1} of{" "}
                                {totalQuestions}
                            </span>
                            <span className="text-sm font-normal">
                                Category: {topic ?? "General Knowledge"}
                            </span>
                        </CardTitle>
                        <Progress value={progress} className="w-full" />
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="text-lg font-medium mb-4">
                            {questions[currentQuestion].question}
                        </p>
                        <RadioGroup defaultValue="option-0">
                            {questions[currentQuestion].options.map(
                                (option, index) => (
                                    <div
                                        className="flex items-center space-x-2 mb-2"
                                        key={option.toLowerCase()}
                                    >
                                        <RadioGroupItem
                                            value={`option-${index}`}
                                            id={`option-${index}`}
                                        />
                                        <Label htmlFor={`option-${index}`}>
                                            {option}
                                        </Label>
                                    </div>
                                )
                            )}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setCurrentQuestion((prev) =>
                                    Math.max(0, prev - 1)
                                );
                            }}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setCurrentQuestion((prev) =>
                                    Math.min(totalQuestions - 1, prev + 1)
                                );
                            }}
                        >
                            Next
                        </Button>
                    </CardFooter>
                </Card>
            </main>

            <footer className="border-t">
                <div className="container mx-auto px-4 py-4 flex justify-center">
                    <Button>Submit Quiz</Button>
                </div>
            </footer>
        </>
    );
}
