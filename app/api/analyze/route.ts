import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { resume, jobDescription } = await req.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: "Missing resume or job description" },
        { status: 400 }
      );
    }

const prompt = `
You are an expert ATS (Applicant Tracking System).

Analyze the resume against the job description.

Return STRICT JSON in this exact format:

{
  "ats_score": number,
  "missing_skills": string[],
  "suggestions": string[],
  "professional_summary": string
}

DO NOT include any explanation text.
ONLY return valid JSON.

Resume:
${resume}

Job Description:
${jobDescription}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

const content = response.choices[0].message.content;

let parsed;

try {
  parsed = JSON.parse(content!);
} catch (err) {
  return NextResponse.json(
    { error: "AI response parsing failed", raw: content },
    { status: 500 }
  );
}

return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
