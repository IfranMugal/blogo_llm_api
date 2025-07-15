// reviewBlog.js
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm.js";

export async function reviewBlog(blogText) {
  const prompt = PromptTemplate.fromTemplate(
    "Review and improve this blog post's grammar, clarity, and tone:\n\n{blog_text}"
  );
  const input = await prompt.format({ blog_text: blogText });
  const response = await llm.invoke(input);
  return response.content;
}
