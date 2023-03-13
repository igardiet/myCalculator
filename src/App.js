import { useReducer } from "react";
import "./styles.css";

function reducer(state, action) {}

export function App() {
  const [{ screenNumbers, screenHistory, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <article>
      <div className="whole-calculator">
        <div className="output">
          <div data-screen-history className="screen-history">
            {screenHistory}{operation}
          </div>
          <div data-screen-numbers className="screen-numbers">
            {screenNumbers}
          </div>
        </div>
        <button data-all-clear className="double-size">
          AC
        </button>
        <button data-delete>⬅︎</button>
        <button data-operation>÷</button>
        <button data-number>7</button>
        <button data-number>8</button>
        <button data-number>9</button>
        <button data-operation>x</button>
        <button data-number>4</button>
        <button data-number>5</button>
        <button data-number>6</button>
        <button data-operation>-</button>
        <button data-number>1</button>
        <button data-number>2</button>
        <button data-number>3</button>
        <button data-operation>+</button>
        <button data-number>.</button>
        <button data-number>0</button>
        <button data-equals className="double-size">
          =
        </button>
      </div>
    </article>
  );
}
