import styled from "styled-components";

export const Button = styled.button`
    --backgroundColor: rgba(246, 241, 209);
    --colorShadeA: rgb(0, 0, 0);
    --colorShadeB: rgb(0, 0, 0); 
    --colorShadeC: rgb(248, 218, 39);
    --colorShadeD: rgb(255, 240, 0);
    --colorShadeE: rgb(255, 240, 0);
    @import 
    url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-size: 1.5rem;
    color: var(--colorShadeA);
    font-weight: 700;
    font-family: "OpenSans", sans-serif;
    padding: 1em 2em;
    border: 2px solid var(--colorShadeA);
    border-radius: 1em;
    background: var(--colorShadeE);
    transform-style: preserve-3d;
    transition: all 175ms cubic-bezier(0, 0, 1, 1);
    &:hover {
        background: var(--colorShadeD);
        transform: translate(0, 0.375em);
    }
    &:before {
        position: absolute;
        content: "";
        width: 99%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--colorShadeC);
        border: 2px solid var(--colorShadeA);
        border-radius: 1em;
        transform: translate3d(0, 0.75em, -1em);
        transition: all 175ms cubic-bezier(0, 0, 1, 1);
    }
    &:hover::before {
        transform: translate3d(0, 0.75em, -1em);
    }
    &:active {
        transform: translate(0em, 0.75em);
    }
    &:active::before {
        transform: translate3d(0, 0, -1em);
        box-shadow: 0 0 0 2px var(--colorShadeB), 0 0.25em 0 0 var(--colorShadeB);
    }
`
