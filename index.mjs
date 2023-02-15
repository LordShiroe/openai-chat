import { Configuration, OpenAIApi } from "openai";
import readlineSync from 'readline-sync';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.listFineTunes();


while (true) {
  const input = readlineSync.prompt();
  if (input === 'bye') {
    console.log('Bye!')
    break;
  }
  try {
    const chatResponse = await openai.createCompletion({
      model: response.data.data[0].fine_tuned_model,
      prompt: input,
      max_tokens: 16,
      temperature: 0.2,
    });
    console.log('HAL: ', chatResponse.data.choices[0].text.replaceAll('\n', '').trim())
  } catch {
    console.log('Something went wrong!')
    break;
  }
}