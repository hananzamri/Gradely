import { useState, useEffect } from "react";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import { profileData } from "../data/profileData";
import { goals, getGpaMessage, getTargetStatus, defaultSems } from "../data/targetData";

// ─── AI Advisor helper ────────────────────────────────────────────────────────
// Uses OpenRouter API with your OPENROUTER_API_KEY from .env
// Your .env must have:  VITE_OPENROUTER_API_KEY=sk-or-v1-xxxx

async function fetchAiAdvice({ profileData, selectedGoal, requiredGPA, gpaGap, status, semesters }) {

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key not found. Make sure your .env file has VITE_OPENROUTER_API_KEY=sk-or-v1-... and restart the dev server."
    );
  }

  const prompt = `You are an academic advisor for a university student. Analyze their situation and give concise, actionable advice.

Student Profile:
- Name: ${profileData.name}
- Major: ${profileData.major} at ${profileData.uni}
- Current CGPA: ${profileData.cgpa} / ${profileData.maxGpa}
- Credits Earned: ${profileData.creditsEarned} / ${profileData.totalCredits}
- Degree Progress: ${((profileData.creditsEarned / profileData.totalCredits) * 100).toFixed(1)}%

Graduation Goal:
- Target: ${selectedGoal.name} (GPA ${selectedGoal.targetGPA.toFixed(2)}+)
- GPA Gap: ${gpaGap > 0 ? "+" + gpaGap.toFixed(2) : gpaGap.toFixed(2)} from current CGPA
- Required GPA for remaining credits: ${requiredGPA.toFixed(2)}
- Status: ${status}

Remaining Semesters Plan:
${semesters.map((sem) => `- Semester ${sem.id}: ${sem.credits} credits`).join("\n")}

Give 3-4 short bullet points of personalised advice. Focus on: whether the goal is realistic, study strategies, credit load suggestions, and any warnings. Be direct and encouraging. Keep it under 120 words total.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Academic Advisor",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-5-haiku",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(
      err?.error?.message || `Request failed with status ${response.status}`
    );
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No advice returned.";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TargetModelPage() {

  const [selectedGoal, setSelectedGoal] = useState(() => {
    const savedGoal = localStorage.getItem("selectedGoal");
    return savedGoal ? JSON.parse(savedGoal) : goals[0];
  });

  useEffect(() => {
    localStorage.setItem("selectedGoal", JSON.stringify(selectedGoal));
  }, [selectedGoal]);

  const [semesters, setSemesters] = useState(defaultSems);

  // AI Advisor state
  const [aiAdvice, setAiAdvice]   = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError]     = useState("");

  const updateSemesterCredits = (id, newCredits) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === id ? { ...sem, credits: newCredits } : sem
      )
    );
  };

  const gpaGap            = selectedGoal.targetGPA - profileData.cgpa;
  const remainingCredits  = profileData.totalCredits - profileData.creditsEarned;
  const currentGradePoint = profileData.cgpa * profileData.creditsEarned;
  const targetGradePoint  = selectedGoal.targetGPA * profileData.totalCredits;
  const pointNeeded       = targetGradePoint - currentGradePoint;
  const requiredGPA       = remainingCredits > 0 ? pointNeeded / remainingCredits : 0;
  const recommendedCredits = Math.ceil(remainingCredits / semesters.length);
  const status            = getTargetStatus(gpaGap, requiredGPA, profileData.maxGpa);

  // Clear stale advice when goal or credits change
  useEffect(() => {
    setAiAdvice("");
    setAiError("");
  }, [selectedGoal, semesters]);

  async function handleGetAdvice() {
    setAiLoading(true);
    setAiError("");
    setAiAdvice("");
    try {
      const advice = await fetchAiAdvice({
        profileData,
        selectedGoal,
        requiredGPA,
        gpaGap,
        status,
        semesters,
      });
      setAiAdvice(advice);
    } catch (err) {
      setAiError(err.message || "Something went wrong.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      <Header />

      <main className="max-w-[1120px] mx-auto p-6">

        <h1 className="text-4xl font-bold text-[#5E7A8C]">
          Target Model
        </h1>

        <p className="text-gray-500 mt-3">
          Model your future academic performance and target your graduation class
        </p>

        {/* Upper cards */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* CGPA card */}
          <div className="bg-white rounded-xl p-6 border border-gray-300">
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Current CGPA
            </p>

            <div className="flex items-end mt-3">
              <span className="text-6xl font-bold text-[#5E7A8C]">
                {profileData.cgpa}
              </span>
              <span className="ml-2 mb-2 text-xl text-gray-500">
                / {profileData.maxGpa}
              </span>
            </div>

            <p className="text-black mt-3">
              based on {profileData.creditsEarned} credits earned
            </p>

            <div className="mt-4 border-t border-gray-200 pt-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Degree Progress</span>
                <span>
                  {((profileData.creditsEarned / profileData.totalCredits) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#5E7A8C] h-2 rounded-full"
                  style={{
                    width: `${(profileData.creditsEarned / profileData.totalCredits) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Goal summary card */}
          <div className="lg:col-span-2 bg-[#5E7A8C] rounded-xl p-8 text-white">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-36 text-center">
                <div className="text-5xl font-bold">
                  {gpaGap <= 0 ? "⭐" : `+${gpaGap.toFixed(2)}`}
                </div>
                <p className="mt-2">{status}</p>
              </div>
              <div className="flex-1 border-l border-gray-400 pl-8 text-center">
                <div className="text-5xl font-bold">{selectedGoal.name}</div>
                <p className="mt-3 text-white/80 text-xl">
                  Target GPA: {selectedGoal.targetGPA.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-8 bg-white/10 border border-white/20 rounded-lg p-4">
              <p className="text-center text-xl italic text-white/90">
                To achieve {selectedGoal.name}, you need to maintain an average
                of {requiredGPA.toFixed(2)} GPA across your remaining {remainingCredits} credits
              </p>
            </div>
          </div>
        </div>

        {/* Goal selector */}
        <div className="bg-white border border-[#5E7A8B] rounded-lg p-6 mt-6">
          <h2 className="text-xl text-black font-bold">
            Target your graduation goal
          </h2>
          <p className="text-gray-500 mt-2">
            Set a target class and we'll calculate exactly what grades you need to achieve to hit it
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {goals.map((goal) => (
              <button
                key={goal.name}
                onClick={() => setSelectedGoal(goal)}
                className={`px-5 py-2 rounded-full transition
                  ${
                    selectedGoal.name === goal.name
                      ? "border border-[#5E7A8C] font-semibold bg-[#5E7A8C] text-white"
                      : "border border-[#5E7A8C] font-semibold hover:bg-[#5E7A8C] hover:text-white"
                  }`}
              >
                {goal.name + " (" + goal.targetGPA.toFixed(2) + "+)"}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction cards */}
        <div className="bg-white border border-[#5E7A8C] rounded-xl p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#5E7A8C]">
            Predict Future Goal
          </h2>
          <p className="text-gray-500 mt-2">
            Set target GPA for your remaining semesters
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {semesters.map((sem, index) => {
              const creditsUpToHere = semesters
                .slice(0, index + 1)
                .reduce((sum, s) => sum + s.credits, 0);

              const totalCreditsAtPoint = profileData.creditsEarned + creditsUpToHere;

              const goalGPA =
                (selectedGoal.targetGPA * totalCreditsAtPoint - currentGradePoint)
                / creditsUpToHere;

              const displayGpa = Math.min(profileData.maxGpa, Math.max(1.0, goalGPA));
              const message    = getGpaMessage(goalGPA, profileData.maxGpa);

              return (
                <div
                  key={sem.id}
                  className="bg-[#D9E3E8] border border-[#D9E3E8] rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Semester {sem.id}</h3>
                    <span className="font-bold text-[#5E7A8C]">{sem.credits} credits</span>
                  </div>
                  <div className="text-gray-700 mt-2">
                    <p>Goal GPA: {displayGpa.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-2 italic">{message}</p>
                  </div>
                  <input
                    type="range"
                    min="9"
                    max="21"
                    value={sem.credits}
                    onChange={(e) =>
                      updateSemesterCredits(sem.id, Number(e.target.value))
                    }
                    className="w-full mt-4 accent-[#5E7A8C]"
                  />
                  <p className="text-sm text-gray-500 mt-2 italic">
                    Recommended credit hour: {recommendedCredits}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── AI Academic Advisor ─────────────────────────────────────────────── */}
        <div className="bg-white border border-[#5E7A8C] rounded-xl p-6 mt-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#5E7A8C]">
                AI Academic Advisor
              </h2>
              <p className="text-gray-500 mt-1">
                Get personalised advice based on your current goal and credit plan
              </p>
            </div>

            <button
              onClick={handleGetAdvice}
              disabled={aiLoading}
              className="shrink-0 bg-[#5E7A8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {aiLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Thinking...
                </>
              ) : (
                "Get Advice"
              )}
            </button>
          </div>

          {/* Error */}
          {aiError && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
              ⚠️ {aiError}
            </div>
          )}

          {/* Advice */}
          {aiAdvice && !aiError && (
            <div className="mt-6 bg-[#EEF4F7] border border-[#D9E3E8] rounded-xl p-6">
              <p className="text-xs uppercase tracking-widest text-[#5E7A8C] mb-3 font-semibold">
                Advisor Response
              </p>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {aiAdvice}
              </p>
            </div>
          )}

          {/* Empty state */}
          {!aiAdvice && !aiError && !aiLoading && (
            <div className="mt-6 bg-[#F4F7F9] rounded-xl p-8 text-center">
              <p className="text-gray-400 text-sm">
                Click "Get Advice" to receive personalised guidance for your{" "}
                <span className="font-medium text-[#5E7A8C]">{selectedGoal.name}</span> goal
              </p>
            </div>
          )}
        </div>

      </main>

      <BottomNav />
    </div>
  );
}
