import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm.js";

export async function generateBlog(topic) {
  // Step 1: Check if the topic is appropriate
  const checkPrompt = PromptTemplate.fromTemplate(
    `Just reply with one word.
You are a strict content filter for kids blog topics.
Only respond with "valid" or "invalid".

Check the following topic: "{topic}"`
  );

  const checkInput = await checkPrompt.format({ topic });
  const checkResponse = await llm.invoke(checkInput);
  const verdict = checkResponse.content.trim().toLowerCase();

  const invalidPhrases = ["invalid", "not a valid topic", "i'm sorry"];
  if (invalidPhrases.some(phrase => verdict.includes(phrase))) {
    return "Invalid blog topic.";
  }

  // Step 2: Generate the blog
  const blogPrompt = PromptTemplate.fromTemplate(
    `You are an AI that helps people to write blogs on their experience on several topics.

TASK:
Write a detailed and SEO-optimized blog post of 500-700 words on the given topic. The blog should not have a title or heading—just the content.

Your topic is: "{topic}"`
  );

  const blogInput = await blogPrompt.format({ topic });
  const blogResponse = await llm.invoke(blogInput);

  return blogResponse.content.trim();
}
