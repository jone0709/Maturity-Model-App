import React, { useMemo } from "react";
import { QUESTIONS } from "../lib/questions";
import type { Answer } from "../App";
import { Pie, Radar } from "react-chartjs-2";
import html2pdf from "html2pdf.js";
import "chart.js/auto";
import React, { useMemo, useRef } from "react"; // ... export default function ResultsPage({ answers }: { answers: Answer[] }) { const printRef = useRef<HTMLDivElement | null>(null);

export default function ResultsPage({ answers }: { answers: Answer[] }) {
  const domains = useMemo(() => {
    const m = new Map<string, number[]>();
    QUESTIONS.forEach((q) => {
      if (!m.has(q.domain)) m.set(q.domain, []);
      m.get(q.domain)!.push(q.id);
    });
    return [...m.entries()];
  }, []);

  const domainStats = useMemo(() => {
    return domains.map(([domain, ids]) => {
      const counts = [0, 0, 0, 0, 0];
      let sum = 0;
      let answered = 0;
      ids.forEach((id) => {
        const a = answers.find((x) => x.qid === id);
        if (a && typeof a.score === "number") {
          counts[a.score] += 1;
          sum += a.score;
          answered++;
        }
      });
      const avg = answered ? sum / answered : 0;
      const maturity = Math.round(avg) + 1;
      return { domain, counts, avg, answered, total: ids.length, maturity };
    });
  }, [answers, domains]);

  const radarData = useMemo(() => {
    return {
      labels: domainStats.map((d) => d.domain),
      datasets: [
        {
          label: "Avg score per domain (0-4)",
          data: domainStats.map((d) => d.avg),
          backgroundColor: "rgba(6,182,212,0.12)",
          borderColor: "rgba(6,182,212,0.95)",
          pointBackgroundColor: "rgba(6,182,212,0.95)"
        }
      ]
    };
  }, [domainStats]);

  function downloadCSV() {
    const rows = [["Domain", "Question", "Target", "Score", "Note"]];
    QUESTIONS.forEach((q) => {
      const a = answers.find((x) => x.qid === q.id);
      rows.push([q.domain, q.text.replace(/\n/g, " "), String(q.target), a?.score ?? "", a?.note ?? ""]);
    });
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const el = document.createElement("a");
    el.href = url;
    el.download = "ai-security-assessment.csv";
    document.body.appendChild(el);
    el.click();
    el.remove();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    const el = document.createElement("div");
    el.style.padding = "18px";
    el.style.fontFamily = "Arial, Helvetica, sans-serif";
    const h = document.createElement("h2");
    h.innerText = "AI Security Maturity Report";
    el.appendChild(h);
    const t = document.createElement("div");
    t.innerText = `Generated: ${new Date().toLocaleString()}`;
    t.style.marginBottom = "8px";
    el.appendChild(t);

    const overallAvg =
      domainStats.reduce((acc, d) => acc + d.avg * d.answered, 0) / Math.max(1, domainStats.reduce((acc, d) => acc + d.answered, 0));
    const overallLevel = Math.round(overallAvg) + 1;
    const odiv = document.createElement("div");
    odiv.innerHTML = `<strong>Overall</strong><div>Avg: ${overallAvg.toFixed(2)} â€” Level: L${overallLevel}</div><hr/>`;
    el.appendChild(odiv);

    domainStats.forEach((d) => {
      const dd = document.createElement("div");
      dd.innerHTML = `<h4>${d.domain} â€” L${d.maturity}</h4><div>Avg ${d.avg.toFixed(2)} (${d.answered}/${d.total})</div>`;
      el.appendChild(dd);
    });

    html2pdf()
      .from(el)
      .set({ filename: "ai-security-maturity-report.pdf", margin: 12 })
      .save();
  }

  return (
    <div style={{ display: "flex", gap: 16, width: "100%" }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Results</h2>
            <div className="small">Pie charts show the distribution of answers (0..4). Radar shows average per domain.</div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" onClick={downloadCSV}>
              Download CSV
            </button>
            <button className="btn btn-ghost" onClick={exportPDF}>
              Export PDF
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h3 style={{ marginBottom: 8 }}>Overall (Radar)</h3>
          <div style={{ background: "rgba(255,255,255,0.01)", padding: 12, borderRadius: 8 }}>
            <Radar data={radarData} options={{ scales: { r: { min: 0, max: 4, ticks: { stepSize: 1 } } }, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: 8 }}>Domains (Pie charts)</h3>
          <div className="results-grid">
            {domainStats.map((d) => (
              <div key={d.domain} className="pie-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 700 }}>{d.domain}</div>
                  <div className="small">
                    L{d.maturity} â€” avg {d.avg.toFixed(2)}
                  </div>
                </div>

                <div style={{ height: 180, marginTop: 8 }}>
                  <Pie
                    data={{
                      labels: ["0", "1", "2", "3", "4"],
                      datasets: [{ data: d.counts, backgroundColor: ["#ef4444", "#f59e0b", "#facc15", "#06b6d4", "#16a34a"] }]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: 320 }}>
        <div className="pie-card">
          <div style={{ fontWeight: 700 }}>Summary</div>

          <div style={{ marginTop: 8 }}>
            {domainStats.map((d) => (
              <div key={d.domain} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="small">{d.domain}</div>
                  <div className="small">L{d.maturity}</div>
                </div>

                <div style={{ height: 6, background: "rgba(255,255,255,0.03)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ width: `${(d.avg / 4) * 100}%`, height: "100%", background: "linear-gradient(90deg,#06b6d4,#7c3aed)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




