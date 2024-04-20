const router = require("express").Router();

// Open AI API configuration object
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

router.post("/find-complexity", async (req, res) => {
  try {
    // sends a request to the OpenAI API and logs the response to the console
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: "Hello, world!",
      max_tokens: 7,
    });
    console.log(response.choices[0].text);

    return res.status(200).json({
      message: "working",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while processing the request.",
    });
  }
});
