import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import * as builder from "../ducks/builder";

function KtContent({ children, contentContainerClasses, openLeftM }) {
  let location = useLocation();
  const ref = useRef();
  useEffect(() => {
    if (!ref && !ref.current) {
      return;
    }

    return;
    ref.current.classList.remove("kt-grid--animateContent-finished");
    setTimeout(() => {
      ref.current.classList.add("kt-grid--animateContent-finished");
    }, 1);
  }, [location]);

  return (
    <div
      ref={ref}
      style={{marginTop: 61}}
      className={`${openLeftM ? "openMS" : ""} w-100 h-100`}
    >
      {children}
    </div>
  );
}

const mapStateToProps = store => ({
  contentContainerClasses: builder.selectors.getClasses(store, {
    path: "content_container",
    toString: true
  })
});

export default connect(mapStateToProps)(KtContent);
