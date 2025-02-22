import { ElevenLabsClient } from 'elevenlabs';
import { ReadableStream } from 'web-streams-polyfill';

const elevenlabs = new ElevenLabsClient({
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY as string,
});

export async function playAudio(text: string) {
  const audio = await elevenlabs.generate({
    voice: 'HJhcnPmbQzLWICT0mdKl',
    text: text,
    model_id: 'eleven_flash_v2_5',
  });

  const audioStream = ReadableStream.from(audio);

  // Create an AudioContext
  const audioContext = new AudioContext();

  // Create a media source node
  const source = audioContext.createBufferSource();

  // Read the stream and decode audio
  const reader = audioStream.getReader();
  const chunks = [];

  let receivedLength = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    receivedLength += value.length;
  }

  // Merge chunks into a single buffer
  const audioData = new Uint8Array(receivedLength);
  let position = 0;
  for (const chunk of chunks) {
    audioData.set(chunk, position);
    position += chunk.length;
  }

  // Decode the audio data
  const decodedData = await audioContext.decodeAudioData(audioData.buffer);

  // Connect and play
  source.buffer = decodedData;
  source.connect(audioContext.destination);
  source.start();
}
