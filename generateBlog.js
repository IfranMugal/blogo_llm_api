// generateBlog.js
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm.js";

export async function generateBlog(topic) {
  const prompt = PromptTemplate.fromTemplate(
    "Write a detailed, SEO-optimized blog post of 500-700 words on: {topic}."
  );
  const input = await prompt.format({ topic });
  const response = await llm.invoke(input);
  return response.content;
}
