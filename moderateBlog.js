// moderateBlog.js
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm.js";

export async function moderateBlog(blogText) {
  const prompt = PromptTemplate.fromTemplate(
    "Analyze this blog content. If it includes offensive, harsh, or inappropriate language, list the words and explain in short. If clean, say 'No issues found.'\n\n{blog_text}"
  );
  const input = await prompt.format({ blog_text: blogText });
  const response = await llm.invoke(input);
  const result = response.content;
  const isWrong = !result.toLowerCase().includes("no issues found");
  return { result, isWrong };
}
