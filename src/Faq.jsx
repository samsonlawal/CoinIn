import { React, useState } from "react";
import "./Faq.css";

function Faq(props) {
  const [selected, setSelected] = useState(null);
  const items = props.items;

  const open = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <div className="faq">
      <h1 className="faq-header">Frequently Asked Questions</h1>

      <div className="faq-acc">
        {items.map((item, i) => (
          <div className="faq-acc-item" key={item.id} onClick={() => open(i)}>
            <button
              // key={item.id}
              className={`accordion ${selected === i ? "active" : ""}`}
            >
              {item.question}
              {selected === i ? (
                <i className="fa-solid fa-minus"></i>
              ) : (
                <i className="fa-solid fa-plus"></i>
              )}
            </button>
            <div className={`panel  ${selected === i ? "open" : "close"}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
