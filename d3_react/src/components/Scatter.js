import React from "react";

const RandomData = () => {
  const data = [...Array(100)].map((e, i) => {
    return {
      x: Math.random() * 40,
      y: Math.random() * 40,
      temparature: Math.random() * 500
    };
  });

  return data;
};

const Scatter = () => {
  const data = RandomData(),
    w = 600,
    h = 600,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };
  const width = w - margin.left - margin.right;
  const height = h - margin.top - margin.bottom;

  return <div>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
      </g>
    </svg>
  </div>;
};

export default Scatter;
