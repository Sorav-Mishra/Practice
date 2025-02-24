import React from "react";
import { useRouter } from "next/router";

const chapters = [
  { name: "Spot the Error", questions: 716 },
  { name: "Sentence Improvement", questions: 790 },
  { name: "Narration", questions: 245 },
  { name: "Active Passive", questions: 250 },
  { name: "Para Jumble", questions: 207 },
  { name: "Fill in the Blanks", questions: 665 },
  { name: "Cloze Test", questions: 860 },
  { name: "Comprehension", questions: 248 },
  { name: "One Word Substitution", questions: 681 },
  { name: "Idioms", questions: 762 },
  { name: "Synonyms", questions: 765 },
  { name: "Antonyms", questions: 740 },
  { name: "Spelling Check", questions: 632 },
  { name: "Homonyms", questions: 42 },
];

const SSCIndex = () => {
  const router = useRouter();

  const handleChapterClick = (chapterName: string) => {
    const formattedName = chapterName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${formattedName}`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto mt-16 text-gray-900 bg-white min-h-screen transition-colors">
      <h1 className="text-2xl font-bold text-center mb-4">SSC English Index</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-200 text-center transition-colors"
            onClick={() => handleChapterClick(chapter.name)}
          >
            <h2 className="text-lg font-semibold text-blue-600">
              {chapter.name}
            </h2>
            <p className="text-gray-700">Questions: {chapter.questions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SSCIndex;
