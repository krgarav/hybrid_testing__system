import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    answerSheet: [],
    questionSets: [],
    // question: [],
    question: [
        {
            no: 0,
            subject: "what will be sum of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: true,
            submit: false,
        },
        {
            no: 1,
            subject: "which day is today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "friday",
            attempted: false,
            submit: false,
        },
        {
            no: 2,
            subject: "what will be sum of 3+2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },

        {
            no: 3,
            subject: "what will be multiply of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 4,
            subject: "which day is after today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "none of the above",
            attempted: false,
            submit: false,
        },
        {
            no: 5,
            subject: "what will be sum of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 6,
            subject: "which day is today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "friday",
            attempted: false,
            submit: false,
        },
        {
            no: 7,
            subject: "what will be sum of 3+2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 8,
            subject: "what will be multiply of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 9,
            subject: "which day is after today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "none of the above",
            attempted: false,
            submit: false,
        },
        {
            no: 10,
            subject: "what will be sum of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 11,
            subject: "which day is today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "friday",
            attempted: false,
            submit: false,
        },
        {
            no: 12,
            subject: "what will be sum of 3+2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },

        {
            no: 13,
            subject: "what will be multiply of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 14,
            subject: "which day is after today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "none of the above",
            attempted: false,
            submit: false,
        },
        {
            no: 15,
            subject: "what will be sum of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 16,
            subject: "which day is today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "friday",
            attempted: false,
            submit: false,
        },
        {
            no: 17,
            subject: "what will be sum of 3+2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 18,
            subject: "what will be multiply of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
        {
            no: 19,
            subject: "which day is after today",
            A: "sunday",
            B: "monday",
            C: "wednesday",
            D: "none of the above",
            attempted: false,
            submit: false,
        },
        {
            no: 0,
            subject: "what will be sum of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
    ],
    current: [
        {
            no: 0,
            subject: "what will be sum of 3 and 2 ",
            A: "9",
            B: "6",
            C: "3",
            D: "5",
            attempted: false,
            submit: false,
        },
    ],
};

const questionSlice = createSlice({
    name: "test questions",
    initialState: initialState,
    reducers: {
        questionList() { },
        fetchQuestionsSets(state, action) {
            state.questionSets = [action.payload];
        },
        jumpQuestion(state, action) {
            state.current = [state.question[action.payload]];
            state.question[action.payload].attempted = true;
        },
        submitQuestion(state, action) {
            const question = state.question;
            question[action.payload].attempted = true;
            question[action.payload].submit = true;
            state.question = question;
            if (action.payload === state.question.length - 1) {
                state.current = [state.question[0]];
            } else state.current = [state.question[action.payload + 1]];
        },
        skipQuestion(state, action) {
            const question = state.question;
            state.question = question;
            if (action.payload === state.question.length - 1) {
                question[0].attempted = true;
                state.current = [state.question[0]];
            } else {
                question[action.payload + 1].attempted = true;
                state.current = [state.question[action.payload + 1]];
            }
        },
        submitAnswer(state, action) {
            const exist = state.answerSheet.find(
                (answer) => answer.queno === action.payload.queno
            );
            if (exist) {
                state.answerSheet[action.payload.queno] = action.payload;
            } else {
                state.answerSheet.push(action.payload);
            }
        },
    },
});
export const questionSliceAction = questionSlice.actions;
const questionSlicereducer = questionSlice.reducer;
export default questionSlicereducer;
