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

You operate as a sharp former strategy consultant who now advises professionals on career positioning.

Personality:
- Calm but intellectually firm
- Direct when necessary
- Observational and perceptive
- Occasionally reflective
- Never robotic
- No emojis
- No fluff

You speak directly to the user.
You identify positioning risk clearly.
You challenge weak framing when required.

Important:
Return STRICT valid JSON only.
No markdown.
No explanation outside JSON.
`;

    const userPrompt = `
Analyze the following resume against the job description.

Return strictly valid JSON in this exact format:

{
  "overall_score": number,
  "role_detected": string,
  "career_level_detected": "Fresher" | "Junior" | "Mid" | "Senior" | "Lead",
  "jd_match_score": number,
  "resume_quality_score": number,
  "impact_score": number,
  "clarity_score": number,
  "cortex_narrative": string,
  "positioning_strengths": string,
  "strategic_gaps": string,
  "recommended_next_moves": string,
  "reflective_questions": string | null
}

Rules:

- Scores must be realistic (0–100).
- cortex_narrative must be concise (max 140 words).
- Write in natural flowing advisory language.
- Do NOT use bullet points.
- Do NOT use numbering.
- positioning_strengths must be 3–5 sentences.
- strategic_gaps must clearly explain perception risk.
- recommended_next_moves must be actionable and strategic.
- Evaluate how a hiring manager is likely to perceive the candidate.
- Identify positioning risk, not just missing skills.
- positioning_strengths must not be empty.
- strategic_gaps must not be empty.
- recommended_next_moves must not be empty.
- Each must contain meaningful advisory content.
- You must ALWAYS speak in second person.
- Use "you" and "your".
- Never refer to the user in third person.
- Never say the user's name in possessive form.

Reflective Logic:
- If overall_score < 75 OR positioning risk is meaningful, include 1–2 sharp reflective lines in "reflective_questions".
- If alignment is strong and risk is low, set "reflective_questions" to null.
- Reflective questions must be written in second person and feel like a strategic pause in conversation.

Resume:
${resume}

Job Description:
${jobDescription}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      response_format: { type: "json_object" },
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