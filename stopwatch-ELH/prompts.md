He usado como herramienta Chatgpt. Con dos prompts que indico a continuación. El segundo además de confirmar que estoy deacuerdo con el plan propuesto por la IA responde a su sugerencia de usar el comando `performance.now()`.

Prompt 1
========

Hi, I want you to plan a web application acting as a competent web developer. The details are below. If you don't undertand something or need clarification, ask me.

## Description

I need a web javascript application that implements a stopwatch. 

## Technical constrains
- Use plain JavaScript and HTML.
- Use only two files index.html and script.js.

## Web page visual interface design
When load the web page must have:
- A read only `counter` text-box that shows the count of the stopWath. On loaded it must show "00:00:00.000". 
- A `start` botton. Located below the counter text-box. On loaded have text "Start" and color blue.
- A `clean` botton. To the right of the `start` button. On loaded have text "Clear" and olor red.

## Functional requirements
It has a internal `count` variable with the number of milliseconds.
It has 3 states: `Init`, `Running`, `Pause`. Next I describe each state and its transitions:

### State `Init`
- The application starts in this state.
- The visual appareance must be that described in "Web page visual interface design" section.
- The `count` is set to 0.
- The `counter` textbox shows the time set to 0 ("00:00:00.000").
- The `clear` button must be disabled.
- If someone clicks the `starts` button, the state changes to `Running`.

### State `Running`
- The `count` must be incremented by 1 each millisecond.
- The `counter` text-box must be updated real time with the value of the `count`.
- The `start` button has text "Pause" and color green.
- The `clear` button is enabled.
- If someone click the `start` button the state changes to `Pause`.
- If someone click the `clear` button the state changes to `Init`.

### State `Pause`
- The `count` states with the value from the previous state, no increment.
- The `counter` text-box shows the value of the `count`.
- The `start` button has text "Continue" and color blue.
- The `clear` button is enabled.
- If someone click the `start` button the state changes to `Running`.
- If someone click the `clear` button the state changes to `Init`.

### Relation between varible `count` and the text-box `counter`
- The changes in `count` must be reflected inmediately in `counter`
- `count` is an integer variable that keeps the number of milliseconds.
- `counter` shows the value of `count` in format hh:mm:ss.sss (tipical ISO 8601 only time format wthout time zone).
- The mathematical relation is
```
count = ((hh * 60 + mm) * 60 + ss.sss) * 1000
``` 
- Examples: 
```
count = 1234 -> counter: 00:00:01.234
count = 9241234 -> counter:  02:34:1.234
```
### Implementation notes
- In the "Functional requirements" the variable `count` is a integer type and it translates to the `counter` text-box with a mathematical formula. If you know any better way of doing this using other Javascript data types or libraries, off you go.


Prompt 2
========

I like your recommendation of using `performance.now()`, use it and implement the two files with this plan.

