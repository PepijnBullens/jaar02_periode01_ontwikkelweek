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
import React, { useState } from "react";

export function TriviaLayoutComponent({
    questions,
    topic,
}: {
    questions: { question: string; options: string[]; correct: string }[];
    topic?: string;
}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [answers, setAnswers] = useState<string[]>([]);

    const totalQuestions = questions.length;
    const progress = (currentQuestion / (totalQuestions - 1)) * 100;

    const handleAnswerChange = (answer: string) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = answer;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        setIsQuizComplete(true);
    };

    const correctAnswersCount = answers.filter(
        (answer, index) => answer === questions[index].correct
    ).length;

    return (
        <>
            <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                {!isQuizComplete ? (
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
                            <RadioGroup
                                value={answers[currentQuestion] || ""}
                                onValueChange={handleAnswerChange}
                            >
                                {questions[currentQuestion].options.map(
                                    (option, index) => (
                                        <div
                                            className="flex items-center space-x-2 mb-2"
                                            key={option.toLowerCase()}
                                        >
                                            <RadioGroupItem
                                                value={option}
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
                                disabled={currentQuestion === 0}
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
                                    currentQuestion < totalQuestions - 1
                                        ? setCurrentQuestion((prev) =>
                                              Math.min(
                                                  totalQuestions - 1,
                                                  prev + 1
                                              )
                                          )
                                        : handleSubmit();
                                }}
                            >
                                {currentQuestion < totalQuestions - 1
                                    ? "Next"
                                    : "Finish"}
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <Card className="w-full max-w-2xl">
                        <CardHeader>
                            <CardTitle>Your Quiz Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-medium mb-4">
                                <p>
                                    You answered{" "}
                                    <strong>{correctAnswersCount}</strong> out
                                    of <strong>{totalQuestions}</strong>{" "}
                                    questions correctly!
                                </p>
                                <p className="mt-4">
                                    <strong>
                                        {Math.round(
                                            (correctAnswersCount /
                                                totalQuestions) *
                                                100
                                        )}{" "}
                                        % Correct
                                    </strong>
                                </p>
                            </div>
                            <div className="space-y-4">
                                {questions.map((question, index) => (
                                    <div key={index}>
                                        <p className="font-medium">
                                            {question.question}
                                        </p>
                                        <p>
                                            Your answer:{" "}
                                            <strong>{answers[index]}</strong>
                                        </p>
                                        <p>
                                            Correct answer:{" "}
                                            <strong>{question.correct}</strong>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            {correctAnswersCount < totalQuestions && (
                                <Button
                                    onClick={() => {
                                        setIsQuizComplete(false);
                                        setCurrentQuestion(0);
                                        setAnswers([]);
                                    }}
                                >
                                    Try Again
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                )}
            </main>

            <footer className="border-t">
                <div className="container mx-auto px-4 py-4 flex justify-center">
                    {!isQuizComplete ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={answers.length !== totalQuestions}
                        >
                            Submit Quiz
                        </Button>
                    ) : null}
                </div>
            </footer>
        </>
    );
}
