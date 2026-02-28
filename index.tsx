import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useQuiz } from '../_context/_QuizContext';

export default function PreviewQuiz() {
  const { items, timerSeconds } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = React.useCallback(() => {
    setSubmitted(true);
    let score = 0;
    items.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) score++;
    });
    Alert.alert('Quiz submitted', `Score ${score} / ${items.length}`);
  }, [items, answers]);

  useEffect(() => {
    setTimeLeft(timerSeconds);
    setSubmitted(false);
    setAnswers({});
  }, [timerSeconds, items]);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted, handleSubmit]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  function handleSelect(qid: string, idx: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time left: {timeLeft}s</Text>
      {items.length === 0 ? (
        <Text style={styles.empty}>No quiz items configured. Go to settings.</Text>
      ) : (
        items.map((q) => (
          <View key={q.id} style={styles.questionBlock}>
            <Text style={styles.question}>{q.question}</Text>
            {q.choices.map((c, idx) => (
              <TouchableOpacity
                key={idx}
                style={
                  answers[q.id] === idx
                    ? styles.choiceSelected
                    : styles.choice
                }
                onPress={() => handleSelect(q.id, idx)}
                disabled={submitted}
              >
                <Text>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))
      )}
      <Button title="Submit" onPress={handleSubmit} disabled={submitted || items.length === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  timer: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  empty: { textAlign: 'center', color: '#666', marginTop: 32 },
  questionBlock: { marginBottom: 16 },
  question: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  choice: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    marginVertical: 2,
  },
  choiceSelected: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    marginVertical: 2,
    backgroundColor: '#def',
  },
});
