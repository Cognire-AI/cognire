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

You behave like a highly experienced career strategist who people trust before making important job decisions.

Tone & Personality:
- Natural and conversational
- Calm, intelligent, and analytical
- Honest but balanced
- Encouraging without hype
- Professional, premium tone
- No emojis
- No exaggerated praise
- No robotic phrasing

You speak like a strategic advisor — not like a scoring machine.

IMPORTANT:
You must return STRICT valid JSON only.
No text before or after JSON.
No markdown formatting.
No explanations outside JSON.
`;

    const userPrompt = `
Analyze the following resume against the job description.

Infer role alignment, positioning strength, hiring risk, and career maturity.

Return strictly valid JSON in this exact format:

{
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
  "strategic_positioning_advice": string,
  "interview_risk_areas": string[],
  "next_actions": string[]
}

Scoring Guidelines:
- Scores must be realistic (0–100)
- Avoid random high scores
- Keep reasoning internally consistent

Strategic Guidance Rules:
- strategic_positioning_advice must feel personalized and advisory
- Explain how the candidate is likely perceived by hiring managers
- Identify positioning gaps, not just skill gaps
- Maintain a balanced tone

Resume:
${resume}

Job Description:
${jobDescription}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
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