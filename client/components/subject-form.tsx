"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import { useRouter } from "next/navigation"; // If using Next.js
import Link from "next/link";

export function SubjectForm() {
    // State for input field
    const [inputValue, setInputValue] = React.useState("");

    const router = useRouter(); // Router for navigation

    // Handle form submission to redirect
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to /<inputValue>
        if (inputValue) {
            router.push(`/${inputValue}`);
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Enter a Path to Redirect</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col space-y-4"
                    >
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="input-url">
                                Enter Path (e.g., 'questions')
                            </Label>
                            <input
                                id="input-url"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter path here"
                            />
                        </div>
                        <CardFooter className="flex justify-center">
                            {/* Styled Link to look like a button */}
                            <Link
                                href={inputValue ? `/${inputValue}` : "#"}
                                
                                className="inline-block px-6 py-2 mt-4 text-center text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-gray-500"
                            >
                                Go to the quiz
                            </Link>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
