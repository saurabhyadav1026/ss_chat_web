import { useContext, useState } from "react";
import Listener from "../../voiceassistence/Listener";
import api from "@/api/api";
import SpeakerContext from "@/voiceassistance/speaker/SpeakerContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ListenerContext from "@/voiceassistance/listener/ListenerContext";



const VoiceAssistancepage = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { startSpeaking }: any = useContext(SpeakerContext);
  const {isSpeaking,setIsSpeaking}:any=useContext(ListenerContext);

  const action = async (text: string) => {
    try {
      const response = await api.post("/ai/voiceassistance/ask", { text });
      if (response.data && response.data.message) {
        setIsSpeaking(true)
        alert("I will speak "+ response.data.message)
        await startSpeaking(response.data.message).then(setIsSpeaking(false));
      }
    } catch (error) {
      console.error("Error sending spoken text to api:", error);
    }
  };

 

  return (
    <div className="voice-assistant-shell">
      {/* Exit back routing button */}
    {/*   <button className="voice-back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} />
        <span>Exit Assistance</span>
      </button>
 */}
      <div className="voice-assistant-card">
        {/* Large Centered Microphone button */}
        <div className="voice-page-mic-wrapper">
          <Listener id={"page"} active={active} setActive={setActive} action={action} />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistancepage;
