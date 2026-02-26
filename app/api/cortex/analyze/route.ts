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
You are Cognire Cortex — an AI Career Intelligence System.

Your role:
Analyze a user's resume against a specific job description and provide strategic career guidance.

Tone:
- Honest but balanced
- Direct without being harsh
- Encouraging but professional
- Premium career strategist tone
- No emojis
- No exaggerated praise
- Not robotic

You must return STRICT JSON only.
No explanations outside JSON.
`;

    const userPrompt = `
Analyze the following resume and job description.

Return strictly valid JSON in this format:

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

Resume:
${resume}

Job Description:
${jobDescription}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(content || "{}");
    } catch {
      return NextResponse.json(
        { error: "AI response parsing failed." },
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