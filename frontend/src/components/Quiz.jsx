import { useState, useEffect } from "react"
import api from "../utils/api"
import { Send, ChevronRight, Loader2 } from "lucide-react"

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get('/user/questions')
      .then(res => {
        setQuestions(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching questions', err)
        setLoading(false)
      })
  }, [])

  const handleNext = async () => {
    if (!currentAnswer.trim()) {
        alert("Please provide an answer before moving forward.");
        return;
    }

    const newAnswer = { questionId: questions[index]._id, answer: currentAnswer };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (index < questions.length - 1) {
      setIndex(index + 1)
    } else {
      setSubmitting(true);
      try {
        const res = await api.post('/user/submit-test', { answers: updatedAnswers });
        setResult(res.data.analysis);
      } catch (err) {
        alert('Failed to submit test');
      } finally {
        setSubmitting(false);
      }
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-gray-500 font-medium">Loading questions...</p>
    </div>
  )

  if (questions.length === 0) return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-100">
        <p className="text-gray-400 text-lg">No questions have been added yet.</p>
    </div>
  )

  if (result) {
    return (
      <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border-t-8 border-indigo-600">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Send size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Test Completed!
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for sharing. Your personalized SWOT analysis is now ready for review.
        </p>
        <button 
          onClick={() => window.location.href = '/swot'}
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-xl"
        >
          View My Analysis
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-2xl p-10 rounded-3xl max-w-2xl mx-auto border-t-8 border-indigo-600">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded">
                Test Step
            </span>
            <span className="font-bold text-gray-700">
                 {index + 1} of {questions.length}
            </span>
        </div>
        <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-700" 
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
            {questions[index].question}
        </h2>
        <p className="text-gray-500 italic">Please share your thoughts below.</p>
      </div>

      <div className="space-y-6">
        <textarea
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-40 p-6 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-400 focus:bg-white outline-none transition-all text-lg resize-none"
        />

        <button
          onClick={handleNext}
          disabled={submitting}
          className="w-full bg-indigo-600 text-white px-8 py-5 rounded-2xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-200 disabled:opacity-50"
        >
          {submitting ? (
              <>Processing Analysis...</>
          ) : (
              <>
                {index < questions.length - 1 ? "Next Question" : "Submit Test"}
                <ChevronRight size={20} />
              </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Quiz