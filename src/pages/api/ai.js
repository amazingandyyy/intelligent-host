import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
// export async function GET() {
//   res.status(200).json({ response: 'Hello World' });
// }

export default async function POST(req, res) {
  const prompt = req.body.prompt;
  console.log(prompt);
  axios.post(apiUrl, {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a helpful Turo host success assistant.' }, { role: 'user', content: prompt }],
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  }).then(response => {
    res.status(200).json({ response: response.data?.choices[0].message.content });
  })
  .catch(error => {
    res.status(405).json({ error: error.message });
  });
}