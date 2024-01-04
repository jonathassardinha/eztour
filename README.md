# eztour

## Pains we want to solve

1. The modal's positioning
2. Multi-level focus
3. Highlighting untraditional elements (non-square, non-circle)
4. Styling is weird and overcomplicated
5. Managing interactivity with the page during tours
6. (nice-to-have) Hot-reload

## Pains or improvements we do not care about

1. Animation between steps


## Implementation ideas

- We're gonna build a barebones modal, with a better style and position API. The idea for the modal API is something like:

```jsx
<Tour 
  steps={[
    modalProps: {
      horizontal: "center",
      vertical: "left",
      relativeTo: "screen", // or "element"
      className: "",
      children: <div></div> // whatever you want
    }
  ]}
/>
```