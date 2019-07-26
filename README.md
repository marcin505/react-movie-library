# React Hook Fetch Demo

## Run:
`npm install`<br>
`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## How to demo
Set the Throttling in DevTools Network Panel to Slow 3G<br>
Type query in the input and observe the network panel in DevTools<br>
If you type consecutive characters while the request is still pending you will observe cleanup effect canceling the previous request

## Try Custom Hook
Switch to Custom Hook in FunctionComponent.js by uncommenting line with useCustomHook()<br>

## Compare Function and Class Component
You might want to replace FunctionComponent with ClassComponent in index.js