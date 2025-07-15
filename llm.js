import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();


export const llm = new ChatOpenAI({
  modelName: "mistralai/mistral-7b-instruct",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_API_BASE,
  },
});