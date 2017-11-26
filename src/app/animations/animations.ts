import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

export const slideBootom = trigger('slideBootom', [
    state('active', style({ opacity: 1 })),
    state('inactive', style({ opacity: 0 })),
    transition("void => *", [
        animate(200, keyframes([
            style({ opacity: 0, transform: "translateY(30%)", offset: 0 }),
            style({ opacity: 1, transform: "translateY(0%)", offset: 1 }),
        ])),
    ]),
])

export const fadeIn = trigger('fadeIn', [
    transition("void => *", [
        animate(1000, keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 1, offset: 1 })
        ])),
    ]),

])

export const fadeOut = trigger('fadeOut', [
    transition("void => *", [
        animate(1000, keyframes([
            style({ opacity: 1, offset: 1 }),
            style({ opacity: 0, offset: 0 })
        ])),
    ]),

])