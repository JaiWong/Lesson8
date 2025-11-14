import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

// Reusable Question Component
const Question = ({ imageUri, options, selectedAnswer, onSelect }) => {
    return (
        <View style={styles.questionCard}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text style={styles.questionText}>What little guy is this?</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedAnswer}
                    onValueChange={(value) => onSelect(value)}
                    style={styles.picker}
                    dropdownIconColor="#ffb6c1"
                >
                    <Picker.Item label="Select an item..." value="" />
                    {options.map((opt, index) => (
                        <Picker.Item key={index} label={opt} value={opt} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

// Main Quiz App
const QuizApp = () => {
    const questions = [
        {
            imageUri: 'https://th.bing.com/th/id/OIP.iFy3kRVmEB5ydPBTPIIRwgAAAA?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
            options: ['Dog', 'Pom Pom Purin', 'PeePeeBoy'],
            correctAnswer: 'Pom Pom Purin',
        },
        {
            imageUri: 'https://th.bing.com/th/id/OIP.PHUiX5s80lSu1rfHorh6RwAAAA?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
            options: ['Kuri Manju', 'Jittleyang', 'The Bird'],
            correctAnswer: 'Kuri Manju',
        },
        {
            imageUri: 'https://th.bing.com/th/id/OIP.-9jqLoKsz4AZ4zDWqFO20gAAAA?w=131&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
            options: ['Fuhuhlatoogan', 'My Sweet Piano', 'Hello Kitty'],
            correctAnswer: 'My Sweet Piano',
        },
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(''));

    const handleSelect = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) score++;
        });

        let message = `You got ${score} correct answer${score !== 1 ? 's' : ''}!`;
        if (score === questions.length) {
            message += ' 🎉 Great job!';
        } else if (score === 0) {
            message += ' 😢 Try again!';
        }

        Alert.alert('Quiz Result', message);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>🐶 Creature Quiz 🐱</Text>
            {questions.map((q, index) => (
                <Question
                    key={index}
                    imageUri={q.imageUri}
                    options={q.options}
                    selectedAnswer={answers[index]}
                    onSelect={(value) => handleSelect(index, value)}
                />
            ))}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Answers</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffe4e1',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#ff6f91',
        textAlign: 'center',
        marginBottom: 25,
    },
    questionCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    image: {
        width: screenWidth - 60, // padding adjustment
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginVertical: 8,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ffc0cb',
        borderRadius: 8,
        width: '100%',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        backgroundColor: '#ff6f91',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 15,
        marginBottom: 30,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default QuizApp;
