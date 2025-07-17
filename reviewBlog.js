// reviewBlog.js
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm.js";

export async function reviewBlog(blogText) {
  const prompt = PromptTemplate.fromTemplate(
    `You are an expert blog editor. Your job is to:

1. Review the grammar, clarity, and tone of the given blog post.
2. Suggest improvements if needed.
3. Rewrite the blog with improved grammar, tone, and clarity.

Respond in the following structured format exactly:

=== REVIEW ===
[Your review and suggestions here]

=== UPDATED BLOG ===
[Your improved blog content here]

Blog to review:
{blog_text}`
  );

  const input = await prompt.format({ blog_text: blogText });
  const response = await llm.invoke(input);
  return response.content;
}
