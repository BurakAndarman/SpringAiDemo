# IntelliMind

IntelliMind is an AI application that is powered by OpenAI models.

## Features 👇

► Text conversation with ChatGPT 3.5.<br/>
► Audio conversation with ChatGPT 3.5.<br/>
► Changing conversation type with the same model.<br/>
► Generating images with Dall-E 3.<br/>

## Created by using... 🛠

**1.** Spring AI<br/>
**2.** Next.js<br/>
**3.** Tailwind<br/>
**4.** DaisyUI<br/>
**5.** Zustand<br/>

## Some Notes 📝

For the audio conversation part, I convert user audio to text in the backend and send it to 
ChatGPT since multimodal interface in SpringAI doesn't support audio currently. 
When text response received, it is being converted to audio for frontend.
Zustand is being used for holding text messages that comes from both text and audio conversation part.

## Screenshots 📷  

| Text Conv. | Audio Conv. |
| ------------- | ------------- |
| <img src="https://github.com/user-attachments/assets/8ce37365-d349-4c4d-98ef-6912f242823b" width="600px"> | <img src="https://github.com/user-attachments/assets/ef77370d-fcef-49a8-bf4b-b06ad5750bf1" width="600px"> |

| Dark Mode |
| ------------- |
| <img src="https://github.com/user-attachments/assets/4443beb1-d22b-439e-bd42-7853419bd0eb" width="500px"> |
