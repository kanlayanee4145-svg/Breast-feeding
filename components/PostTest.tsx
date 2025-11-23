import React from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import Quiz from './Quiz';

interface Props {
  onComplete: () => void;
  onExit: () => void;
}

const PostTest: React.FC<Props> = ({ onComplete, onExit }) => {
  const handleComplete = (score: number) => {
    console.log("Post-test Score:", score);
    onComplete();
  };

  return (
    <div className="py-6">
      <Quiz 
        questions={QUIZ_QUESTIONS} 
        title="แบบทดสอบหลังเรียน" 
        onComplete={handleComplete}
        onExit={onExit}
        showAnswerKey={true}
      />
    </div>
  );
};

export default PostTest;