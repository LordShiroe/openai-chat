
import { Configuration, OpenAIApi } from "openai";
import fs from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Upload fine tune file for processing
const uploadFileResponse = await openai.createFile(
  fs.createReadStream("hal_script.jsonl"),
  "fine-tune"
);

// Create the fine tune with the file 
const fineTuneUpload = await openai.createFineTune({
  training_file: uploadFileResponse.data.id,
  model: 'davinci',
  suffix: 'hal'
});

console.log('Fine tune Created: ', fineTuneUpload.data)