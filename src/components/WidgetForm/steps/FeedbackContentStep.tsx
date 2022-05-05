import { ArrowLeft} from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshootButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType, onFeedbackRestartRequest, onFeedbackSent,
}: FeedbackContentStepProps) {

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] =useState('');
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  
  function handleSubmitFeedback(event:FormEvent){
    event.preventDefault();

    console.log({
      screenshot, comment,
    })

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button 
        type="button" 
        className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        onClick={onFeedbackRestartRequest}
        >
          <ArrowLeft  weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2" >
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
          {feedbackTypeInfo.title}
          </span>
        <CloseButton />
      </header>
      <form 
      onClick={handleSubmitFeedback}
      className="my-4 w-full">
        <textarea 
        onChange={event => setComment(event.target.value)}
        placeholder="Conte-nos o que está acontecendo..."
        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-violet-500 focus:ring-violet-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
        />

        <footer className="flex gap-2 w-full">
         <ScreenshotButton 
         screenshot={screenshot}
          OnScreenshotTook = {setScreenshot}
         />

          <button
          disabled={comment.length === 0}
          type="submit"
          className="p-2 bg-violet-600 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 mt-2 focus:ring-violet-500 transition-colors disabled:opacity-50 disabled:hover:bg-violet-500"
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
}
