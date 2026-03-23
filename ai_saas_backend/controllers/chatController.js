// import OpenAI from "openai";
import Groq from "groq-sdk";
import axios from "axios";
import Chat from "../models/Chat.js";


//limited free package (after limit it is paid)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export const sendMessage = async (req, res) => {

//   try {

//     const { message } = req.body;

//     const aiResponse = await openai.responses.create({
//       model: "gpt-4.1-mini",
//       input: message
//     });

//     const reply = aiResponse.output_text;

//     const chat = await Chat.create({
//       userId: req.user.id,
//       message,
//       response: reply
//     });

//     res.json(chat);

//   } catch (err) {

//     res.status(500).json({ error: err.message });

//   }

// };


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


// AI with internet search (with latest search info)
export const sendMessage2 = async (req, res) => {

  try {

    const { message } = req.body;

    // Step 1: Search latest info
    const search = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          q: message,
          api_key: process.env.SERP_API_KEY
        }
      }
    );

    const latestInfo =
      search.data.organic_results?.[0]?.snippet || "";

    // Step 2: Send info to AI
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Use this latest information to answer: ${latestInfo}`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.1-8b-instant"
    });

    const reply = completion.choices[0].message.content;

    const chat = await Chat.create({
      userId: req.user.id,
      message,
      response: reply
    });

    res.json(chat);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


//with remember previous chats but without latest info
export const sendMessage = async (req, res) => {

  try {

    const { message } = req.body;

    // get last 10 chats
    const previousChats = await Chat.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    const messages = [];

    // system message
    messages.push({
      role: "system",
      content: "You are a helpful AI assistant."
    });

    // add previous chats
    previousChats.reverse().forEach(chat => {
      console.log("chat-------------", chat)
      messages.push({
        role: "user",
        content: chat.message
      });

      messages.push({
        role: "assistant",
        content: chat.response
      });
    });

    // add current message
    messages.push({
      role: "user",
      content: message
    });

    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant"
    });

    const reply = completion.choices[0].message.content;

    await Chat.create({
      userId: req.user.id,
      message,
      response: reply
    });

    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


// (knowledge till 2023) (free package)
export const sendMessage1 = async (req, res) => {

  try {

    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      // model: "llama3-8b-8192"
      model: "llama-3.1-8b-instant"
    });

    const reply = completion.choices[0].message.content;

    const chat = await Chat.create({
      userId: req.user.id,
      message,
      response: reply
    });

    res.json(chat);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


export const getChats = async (req, res) => {

  const chats = (await Chat.find({ userId: req.user.id }).sort({createdAt: -1}));

  res.json(chats);

};