// generateBlog.js
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm.js";

export async function generateBlog(topic) {
  console.log("this is topic:", topic);

  const prompt = PromptTemplate.fromTemplate(
    `You are an AI content writer.

TASK:
If the topic "{{topic}}" is valid, write a detailed and SEO-optimized blog post of 500-700 words on it. The blog should not have a title or heading—just the content.

If the topic is not a valid blog topic (i.e., it is nonsense like "sdfsdfsdffff", contains random characters, offensive language, or is completely irrelevant), you must respond with exactly:
invalid title

Do not explain. Do not write a substitute blog. Do not apologize. Do not continue. Just reply with exactly:
invalid title`
  );

  const input = await prompt.format({ topic });
  const response = await llm.invoke(input);

  const content = response.content.trim();

  if (content.toLowerCase() === "i'm sorry for any inconvenience") {
    return "Invalid blog topic.";
  }

  return content;
}
