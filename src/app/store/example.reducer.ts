import {Action, createReducer, on } from "@ngrx/store";
import {ExampleActions} from "./example.actions";

export interface State {
    count: number;
    message?: string;
}

const initialState : State = {
    count: 0
}

const exampleReducer = createReducer(
    initialState,
    on(ExampleActions.increaseCount, (state) => ({
        ...state,
        count: state.count + 1
    })),
    on(ExampleActions.sendMessage, (state, {message}) => ({
        ...state,
        message: message
    }))
);

export function reducer (state : State | undefined, action: Action) {
    return exampleReducer(state, action)
}