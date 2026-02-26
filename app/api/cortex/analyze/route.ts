import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { resume, jobDescription } = await req.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and Job Description are required." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are Cognire Cortex — a premium AI Career Intelligence System.

You operate as a hybrid between:
- A strategic career consultant
- A personal long-term career advisor

Tone:
- Natural and conversational
- Calm and analytical
- Honest but balanced
- Professional and premium
- Encouraging without hype
- Never robotic
- No emojis

You speak directly to the user in a refined, advisory tone.

You must return STRICT JSON only.
No markdown.
No explanations outside JSON.
`;

    const userPrompt = `
Analyze the following resume against the job description.

Return strictly valid JSON in this format:

{
  "cortex_narrative": string,
  "overall_score": number,
  "role_detected": string,
  "career_level_detected": "Fresher" | "Junior" | "Mid" | "Senior" | "Lead",
  "jd_match_score": number,
  "resume_quality_score": number,
  "impact_score": number,
  "clarity_score": number,
  "strengths": string[],
  "improvement_areas": string[],
  "missing_core_skills": string[],
  "interview_risk_areas": string[],
  "next_actions": string[]
}

Rules:

- cortex_narrative must be 2–4 short paragraphs.
- It should feel like a strategic advisory brief.
- Explain positioning, perception risk, and opportunity.
- Speak naturally, occasionally using "you" and "your profile".
- Keep tone premium and composed.
- Scores must be realistic (0–100).

Resume:
${resume}

Job Description:
${jobDescription}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.55,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0].message.content?.trim();

    let parsed;

    try {
      parsed = JSON.parse(content || "{}");
    } catch {
      return NextResponse.json(
        { error: "AI response parsing failed.", raw: content },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}