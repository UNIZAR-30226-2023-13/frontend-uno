import styled from "styled-components";

/*{
    POSIBLE ADICION: CURSOR NOT ALLOWED ????? ----------------------------------------------
}*/
export const DisabledButton = styled.button`
    --backgroundColor: rgba(246, 241, 209);
    --colorShadeA: rgb(0, 0, 0);
    --colorShadeB: rgb(0, 0, 0); 
    --colorShadeC: rgb(105,105,105);
    --colorShadeD: rgb(255, 240, 0);
    --colorShadeE: rgb(128,128,128);
    @import 
    url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
    display: inline-block;
    outline: none;
    border: 0;
    cursor: not-allowed;
    padding: 50px;
    text-decoration: none;
    font-size: 1.5rem;
    color: var(--colorShadeA);
    font-weight: 700;
    font-family: "OpenSans", sans-serif;
    padding: 1em 2em;
    max-height: 100px;
    border: 2px solid var(--colorShadeA);
    border-radius: 1em;
    background: var(--colorShadeE);
    transform-style: preserve-3d;
    transition: all 175ms cubic-bezier(0, 0, 1, 1);
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
`