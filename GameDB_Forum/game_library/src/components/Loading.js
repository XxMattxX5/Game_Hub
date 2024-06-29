import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="loading_box">
      <ReactLoading type={"spin"} width={175} height={"auto"} />
    </div>
  );
}
