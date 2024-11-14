import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDPTFNiSqIKZ-7t5XvnfR4ovGAV5kAfwrY");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  if (result && result.response && typeof result.response.text === 'function') {
    const responseText = await result.response.text();
    console.log(responseText);
    return responseText;
  } else {
    throw new Error('Invalid response from the chat session');
  }
}

export default runChat;