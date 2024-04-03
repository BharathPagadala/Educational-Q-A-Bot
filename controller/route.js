const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBqBU1-xxpX8uBTFLvyrWelG7wYQxoHBQc");

async function roadmap(req, res) {
  const module = req.body.language;
  const user = req.body.user;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `behave like a software developer, and my name is ${user}, help me to become a ${module} developer`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return {
      status: 200,
      data: text,
    };
  } catch (e) {
    res.status(500);
    res.send("Oops! Something went wrong...");
    console.log("ERROR::: ", e);
  }
}
async function learn(req, res) {
  const prompt = req.body.prompt;
  const module = req.body.language;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const promptMsg = `breifly explain the topic ${prompt} in ${module}`;
    const result = await model.generateContent(promptMsg);
    const response = await result.response;
    const text = response.text();
    return {
      status: response.status,
      data: text,
    };
  } catch (e) {
    res.status(500);
    res.send("Oops! Something went wrong...");
    console.log("ERROR::: ", e);
  }
}

module.exports = {
  roadmap,
  learn,
};
