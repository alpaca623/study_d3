import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const RandomData = () => {
  const data = [...Array(100)].map((e, i) => {
    return {
      x: Math.random() * 40,
      y: Math.random() * 40,
      temparature: Math.random() * 500
    };
  });

  const popData = [
    { age: "80 and up", value: 0.016 },
    { age: "75 - 79", value: 0.015 },
    { age: "70 - 74", value: 0.021 },
    { age: "69 - 65", value: 0.026 },
    { age: "60 - 64", value: 0.034 },
    { age: "59 - 55", value: 0.045 },
    { age: "50 - 54", value: 0.051 },
    { age: "49 - 45", value: 0.06 },
    { age: "40 - 44", value: 0.066 },
    { age: "39 - 35", value: 0.071 },
    { age: "34 - 30", value: 0.073 },
    { age: "29 - 25", value: 0.081 },
    { age: "20 - 24", value: 0.089 },
    { age: "15 - 19", value: 0.088 },
    { age: "10 - 14", value: 0.086 },
    { age: "5 - 9", value: 0.088 },
    { age: "0 - 4", value: 0.093 }
  ];

  return popData;
};

function App() {
  const data = RandomData();

  const ref = useRef(null);

  const w = 600,
    h = 600,
    margin = {
      top: 40,
      right: 0,
      bottom: 0,
      left: 40
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // const g = svg
    //   .append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, width]);

    // const y = d3.scaleOrdinal().domain(data.map(d => d.age)).rangeBand;
    // const y = d3
    //   .scaleBand()
    //   .domain(d3.range(data.length))
    //   .rangeRound([margin.top, height - margin.bottom])
    //   .padding(0.2);
    const y = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .on("mouseover", (d, i) => console.log(d, i))
      .attr("x", 0)
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value))
      .attr("height", 20)
      .attr("fill", "black");

    const xAxis = d3.axisTop(x).ticks(5, "%");
    const yAxis = d3
      .axisLeft(y)
      .tickFormat(i => data[i].age)
      .tickSizeOuter(0);

    svg
      .append("g")
      .attr("transform", `translate(0, ${margin.top})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // .attr("transform", `translate(0, ${margin.top})`)
    // .call(d3.axisTop(x).ticks(width / 80));
  }, [data, height, width]);

  return <div className="App" ref={ref}></div>;
}

export default App;
