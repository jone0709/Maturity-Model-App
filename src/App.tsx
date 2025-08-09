import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import QuestionnairePage from "./pages/QuestionnairePage";
import ResultsPage from "./pages/ResultsPage";
import { QUESTIONS } from "./lib/questions";

/**
 * Answer shape: qid references QUESTIONS[].id
 */
export type Answer = { qid: number; score: number | null; note?: string };

const STORAGE_KEY = "ai-assessment-answers-v1";

export default function App() {
  const [answers, setAnswers] = useState<Answer[]>(
    () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as Answer[];
      } catch (e) {}
      return QUESTIONS.map((q) => ({ qid: q.id, score: null, note: "" }));
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (e) {}
  }, [answers]);

  function updateAnswer(qid: number, score: number | null, note?: string) {
    setAnswers((prev) =>
      prev.map((a) => (a.qid === qid ? { ...a, score, note: note === undefined ? a.note : note } : a))
    );
  }

  function resetAll() {
    if (!confirm("Reset all answers?")) return;
    const initial = QUESTIONS.map((q) => ({ qid: q.id, score: null, note: "" }));
    setAnswers(initial);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  return (
    <div className="app">
      <header className="site-header">
        <h1>AI Security Maturity Assessment</h1>
      </header>

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={<QuestionnairePage answers={answers} updateAnswer={updateAnswer} resetAll={resetAll} />}
          />
          <Route path="/results" element={<ResultsPage answers={answers} />} />
        </Routes>
      </main>

      <footer className="site-footer">Made for the community</footer>
    </div>
  );
}




