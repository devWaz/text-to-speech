import './style.css'
const textarea = document.querySelector('textarea') as HTMLTextAreaElement
const button = document.querySelector('button') as HTMLButtonElement
const select = document.querySelector('select') as HTMLSelectElement

let isSpeaking = true
const synth = speechSynthesis

const populateVoices = () => {
  // mapping through the list of voices
  for(const voice of synth.getVoices()){
    // setting US English as default
    const selected = voice.name === 'Google US English' ? 'selected' : ''
    // creating option tags of voices 
    const option = `<option value="${voice.name}" ${selected}>${voice.name}</option>`
    select.insertAdjacentHTML('beforeend' , option)
  }
}
populateVoices()

synth.addEventListener('voiceschanged' , populateVoices)

const textToSpeech = () => {
  const text = textarea.value

  if (!synth.speaking && text) {
    const speech = new SpeechSynthesisUtterance(text)
    const selectedVoice = select.value // Get the selected voice
    const voices = synth.getVoices()
    const voice = voices.find((v) => v.name === selectedVoice)
    if (voice) {
      speech.voice = voice // Set the voice property of the SpeechSynthesisUtterance object to the selected voice
    }
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
  } else {
    isSpeaking = false
    button.innerText = 'Speaking'
  }

  setInterval(() => {
    if (!synth.speaking && !isSpeaking) {
      isSpeaking = true
      button.innerText = 'Convert to Speech'
    }
  })
}

button.addEventListener('click' , textToSpeech)

select.addEventListener('change', () => {
  // const text = textarea.value
  if (synth.speaking) {
    synth.cancel() // Stop the current speech
    isSpeaking = false
    button.innerText = 'Convert to Speech'
    setTimeout(() => {
      textToSpeech() // Start speech with the newly selected voice
    }, 500)
  } else {
    textToSpeech() // Start speech with the newly selected voice
  }
})