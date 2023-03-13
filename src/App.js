import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD: "add",
  OPERATION: "operation",
  CLEAR: "clear",
  DELETE: "delete",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      if (state.overwrite) {
        return {
          ...state,
          screenActual: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.screenActual === "0") {
        return state;
      }
      if (payload.digit === "." && state.screenActual.includes(".")) {
        return state;
      }
      return {
        ...state,
        screenActual: `${state.screenActual || ""}${payload.digit}`,
      };
    case ACTIONS.OPERATION:
      if (state.screenActual == null && state.screenHistory == null) {
        return state;
      }

      if (state.screenActual == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.screenHistory == null) {
        return {
          ...state,
          operation: payload.operation,
          screenHistory: state.screenActual,
          screenActual: null,
        };
      }

      return {
        ...state,
        screenHistory: evaluate(state),
        operation: payload.operation,
        screenActual: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          screenActual: null,
        };
      }
      if (state.screenActual == null) return state;
      if (state.screenHistory === 1) {
        return { ...state, screenActual: null };
      }
      return {
        ...state,
        screenActual: state.screenActual.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.screenActual == null ||
        state.screenHistory == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        screenHistory: null,
        operation: null,
        screenActual: evaluate(state),
      };
    default:
  }
}

function evaluate({ screenActual, screenHistory, operation }) {
  const history = parseFloat(screenHistory);
  const actual = parseFloat(screenActual);
  if (isNaN(history) || isNaN(actual)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = history + actual;
      break;
    case "-":
      computation = history - actual;
      break;
    case "*":
      computation = history * actual;
      break;
    case "/":
      computation = history / actual;
      break;
    default:
  }

  return computation.toString();
}

const formatInteger = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return formatInteger.format(integer);
  return `${formatInteger.format(integer)}.${decimal}`;
}

export function App() {
  const [{ screenActual, screenHistory, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <article>
      <div className="whole-calculator">
        <div className="output">
          <div className="screenHistory">
            {formatOperand(screenHistory)}
            {operation}
          </div>
          <div className="screenActual">{formatOperand(screenActual)}</div>
        </div>
        <button
          className="double-size"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>⬅︎</button>
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="x" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />

        <button
          className="double-size"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </article>
  );
}
