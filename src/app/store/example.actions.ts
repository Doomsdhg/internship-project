import { createAction, props } from "@ngrx/store";

export namespace ExampleActions {
    export const increaseCount = createAction("INCREASE_COUNT");

    export const sendMessage = createAction(
        "SEND_MESSAGE",
        props<{message?: string}>()
    )
}