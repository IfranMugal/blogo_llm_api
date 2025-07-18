// moderateBlog.js
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm.js";

export async function moderateBlog(blogText) {
  const prompt = PromptTemplate.fromTemplate(`
You are a STRICT and UNBIASED blog content moderation system. Your task is to analyze the given blog text and identify any occurrences of prohibited language.

RULES:
1. Flag and list any occurrences of offensive, explicit, vulgar, abusive, or threatening language regardless of context. This includes words and phrases like "fuck", "fucking", "bitch", "asshole", "I will kill you", "you should die", "killing", etc.
2. Do not excuse or allow any word usage by invoking context (e.g., metaphors or common idioms). If any such word appears, it must be flagged.
3. For each flagged word or phrase, list it only once along with a brief note such as "profanity detected" or "threatening language detected." You do not need to provide further explanations.
4. If there are multiple occurrences, you may indicate the count.
5. If no issues exist, respond with EXACTLY:
No issues found.

Blog text:
{blog_text}
`);

  const input = await prompt.format({ blog_text: blogText });
  const response = await llm.invoke(input);
  const result = response.content.trim();
  const isWrong = !result.toLowerCase().includes("no issues found" || "Profanity detected");
  return { result, isWrong };
}
