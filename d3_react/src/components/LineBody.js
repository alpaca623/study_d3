import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const LineBody = ({ data }) => {
  const ref = useRef(null);

  const w = 500,
    h = 300,
    margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = w - margin.right - margin.left;
  const height = h - margin.top - margin.bottom;

  useEffect(() => {
    if (data.length > 0) {
      let svg = d3.select(ref.current).attr("viewBox", [0, 0, width, height]);
      const x = d3
        .scaleUtc()
        .domain(d3.extent(data, (d) => new Date(d.date)))
        .range([margin.left, width - margin.right]);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const line = d3
        .line()
        .defined((d) => !isNaN(d.value))
        .x((d) => x(new Date(d.date)))
        .y((d) => y(d.value));

      const xAxis = (g) =>
        g.attr("transform", `translate(0, ${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        );
      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .select(".tick:last-of-type text")
              .clone()
              .attr("x", 3)
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text(data.y)
          );
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 0.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

      svg.append('g').call(xAxis);
      svg.append('g').call(yAxis);
      svg.node();
    }
  }, [data]);
  return <svg ref={ref}></svg>;
};

export default LineBody;
