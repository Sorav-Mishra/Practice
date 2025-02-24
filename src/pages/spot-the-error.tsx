import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

interface Question {
  exam_name: string;
  question_number: number;
  question: string;
  options: { [key: string]: string };
  correct_option: string;
  solution: string;
}

export default function McqPractice() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/mcqs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch MCQs.");
        }
        return res.json();
      })
      .then((data: Question[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (optionKey: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionKey);

    if (questions[currentIndex].correct_option === optionKey) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  const changeQuestion = (index: number) => {
    setCurrentIndex(index);
    setSelectedOption(null);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  if (!questions.length) {
    return <div className="text-center text-lg">No questions available.</div>;
  }

  const {
    exam_name,
    question_number,
    question,
    options,
    correct_option,
    solution,
  } = questions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto p-8 border rounded-xl shadow-xl bg-white text-left space-y-6 mt-10">
      <h1 className="text-3xl font-bold text-center bg-gray-200 uppercase p-3 rounded-md">
        {exam_name}
      </h1>

      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-semibold">
          Question {question_number} of {questions.length} ({exam_name})
        </p>
        <div className="flex space-x-4">
          <span className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold shadow-md">
            {correctCount} ✅
          </span>
          <span className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold shadow-md">
            {incorrectCount} ❌
          </span>
        </div>
      </div>

      {/* Select Question Dropdown */}
      <label
        htmlFor="question-select"
        className="block text-lg font-semibold text-gray-700"
      >
        Select a question:
      </label>
      <select
        id="question-select"
        value={currentIndex}
        onChange={(e) => changeQuestion(Number(e.target.value))}
        className="w-full p-2 border rounded-lg shadow-sm bg-gray-100"
      >
        {questions.map((q, index) => (
          <option key={index} value={index}>
            Question {q.question_number} ({q.exam_name})
          </option>
        ))}
      </select>

      {/* Question
      <p className="text-xl font-semibold text-gray-800 p-4 bg-gray-100 rounded-lg">
        {question}
      </p> */}
      {/* Question */}
      <p className="text-xl font-semibold text-gray-800 p-4 bg-gray-100 rounded-lg">
        {question} <span className="text-sm text-gray-600">({exam_name})</span>
      </p>

      {/* Answer Options */}
      <div className="space-y-3">
        {Object.entries(options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleAnswer(key)}
            className={`block w-full p-4 rounded-lg border text-lg transition-all duration-300 text-left shadow-sm
              ${
                selectedOption === key
                  ? key === correct_option
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Show correct answer if wrong selection */}
      {selectedOption !== null && selectedOption !== correct_option && (
        <p className="mt-4 text-green-600 text-xl font-semibold">
          ✅ Correct Answer: {options[correct_option]}
        </p>
      )}

      {/* Solution Box */}
      {selectedOption !== null && (
        <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-100 rounded-lg">
          <p className="text-blue-600 text-lg font-medium">Solution:</p>
          <p className="text-gray-800 text-md mt-1">{solution}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => changeQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 disabled:bg-gray-300"
        >
          ← Previous
        </button>
        <button
          onClick={() => changeQuestion(currentIndex + 1)}
          disabled={currentIndex >= questions.length - 1}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
