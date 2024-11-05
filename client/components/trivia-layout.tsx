'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function TriviaLayoutComponent({ questions }: { questions: { question: string, options: string[] }[] }) {
  // This would be managed by state in a real application
  const currentQuestion = 3
  const totalQuestions = 10
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Trivia Master</h1>
          <div className="text-sm">Score: 200</div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Question {currentQuestion} of {totalQuestions}</span>
              <span className="text-sm font-normal">Category: History</span>
            </CardTitle>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg font-medium mb-4">Who was the first President of the United States?</p>
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">George Washington</Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">Thomas Jefferson</Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="option-3" id="option-3" />
                <Label htmlFor="option-3">John Adams</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-4" id="option-4" />
                <Label htmlFor="option-4">Benjamin Franklin</Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <Button>Submit Quiz</Button>
        </div>
      </footer>
    </div>
  )
}