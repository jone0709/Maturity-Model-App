import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../lib/questions";
import type { Answer } from "../App";

export default function QuestionnairePage({
  answers,
  updateAnswer,
  resetAll
}: {
  answers: Answer[];
  updateAnswer: (qid: number, score: number | null, note?: string) => void;
  resetAll: () => void;
}) {
  const navigate = useNavigate();

  const domains = useMemo(() => {
    const m = new Map<string, number[]>();
    QUESTIONS.forEach((q) => {
      if (!m.has(q.domain)) m.set(q.domain, []);
      m.get(q.domain)!.push(q.id);
    });
    return [...m.keys()];
  }, []);

  const [selectedDomain, setSelectedDomain] = useState<string>(QUESTIONS[0].domain);

  const handlePrevDomain = () => {
    const currentIndex = domains.indexOf(selectedDomain);
    if (currentIndex > 0) {
      setSelectedDomain(domains[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextDomain = () => {
    const currentIndex = domains.indexOf(selectedDomain);
    if (currentIndex < domains.length - 1) {
      setSelectedDomain(domains[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 16, width: "100%" }}>
        <div className="sidebar">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Domains</div>
          <div className="small">Click a domain to load questions</div>
          <div style={{ marginTop: 10 }}>
            {domains.map((d) => (
              <div
                key={d}
                className="domain-item"
                onClick={() => setSelectedDomain(d)}
                style={{ background: d === selectedDomain ? "rgba(6,182,212,0.06)" : undefined }}
              >
                <div>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="main">
          <div className="header">
            <div>
              <h2 style={{ margin: 0 }}>Questionnaire {'\u2014'} {selectedDomain}</h2>
            <div className="small" style={{ marginTop: 6 }}> Scoring: s_i in {`{0,1,2,3,4}`}. Average score then maturity level = round(avgScore) + 1 </div>
            </div>

            <div>
              <button className="btn btn-primary" onClick={() => navigate("/results")}>
                Calculate
              </button>{" "}
              <button className="btn btn-ghost" onClick={resetAll}>
                Reset
              </button>
            </div>
          </div>

          <div>
            {QUESTIONS.filter((q) => q.domain === selectedDomain).map((q) => {
              const ans = answers.find((a) => a.qid === q.id)!;
              return (
                <div key={q.id} className="question-card" id={`q-${q.id}`}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{q.text}</div>
                      <div className="small">Target Level: {q.target}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    {[0, 1, 2, 3, 4].map((v) => (
                      <label key={v} className="choice" style={{ borderColor: ans.score === v ? "rgba(6,182,212,0.6)" : undefined }}>
                        <input type="radio" name={`q-${q.id}`} checked={ans.score === v} onChange={() => updateAnswer(q.id, v)} />
                        <div style={{ fontWeight: 700 }}>{v}</div>
                        <div className="small" style={{ opacity: 0.85, marginLeft: 6 }}>
                          {["Not Implemented", "Minimal", "Partial", "Substantial", "Complete"][v]}
                        </div>
                      </label>
                    ))}

                    <button className="btn" style={{ marginLeft: 12 }} onClick={() => updateAnswer(q.id, null)}>
                      Clear
                    </button>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <textarea
                      placeholder="Optional notes"
                      value={ans.note}
                      onChange={(e) => updateAnswer(q.id, ans.score, e.target.value)}
                      style={{
                        width: "100%",
                        minHeight: 64,
                        background: "rgba(255,255,255,0.01)",
                        border: "1px solid rgba(255,255,255,0.03)",
                        color: "#dfefff",
                        padding: 8,
                        borderRadius: 6
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="domain-navigation">
            <button 
              className="btn btn-ghost"
              onClick={handlePrevDomain}
              disabled={domains.indexOf(selectedDomain) === 0}
            >
              ← Previous Domain
            </button>
            <button 
              className="btn btn-ghost"
              onClick={handleNextDomain}
              disabled={domains.indexOf(selectedDomain) === domains.length - 1}
            >
              Next Domain →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}



