import './style.css'

const textarea = document.querySelector('textarea') as HTMLTextAreaElement
const button = document.querySelector('button') as HTMLButtonElement
let isSpeaking = true

const textToSpeech = () => {
  const synth = window.speechSynthesis
  const text = textarea.value

  if (!synth.speaking && text) {
    const speech = new SpeechSynthesisUtterance(text)
    synth.speak(speech)
  }

  if (text.length > 50) {
    if (synth.speaking && isSpeaking) {
      button.innerText = 'Pause'
      synth.resume()
      isSpeaking = false
    } else {
      button.innerText = 'Resume'
      synth.pause()
      isSpeaking = true
    }
  }

  setInterval(() => {
    if (!synth.speaking && !isSpeaking) {
      isSpeaking = true
      button.innerText = 'Convert to Speech'
    }
  })
}

button.addEventListener('click' , textToSpeech)