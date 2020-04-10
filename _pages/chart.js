async function drawLineChart() {
  const dataset = await d3.json('./history.json')
  
  const yAccessor = d => d.summary.total
  const dateParser = d3.timeParse("%Y-%m-%d")
  const xAccessor = d => dateParser(d.day)
 

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 20,
      right: 20, 
      bottom: 40,
      left: 60,
    },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  const wrapper = d3.select("#wrapper")
              .append("svg")
              .attr("width", dimensions.width)
              .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
        .style("transform", `translate(${
          dimensions.margin.left
        }px, ${
          dimensions.margin.top
        }px)`)

  const yScale = d3.scaleLinear()
                  .domain(d3.extent(dataset, yAccessor))
                  .range([dimensions.boundedHeight, 0])
                  .nice()
  const xScale = d3.scaleTime()
                  .domain(d3.extent(dataset, xAccessor))
                  .range([0, dimensions.boundedWidth])
                  .nice()

  const lineGenerator = d3.line()
                        .x(d => xScale(xAccessor(d)))
                        .y(d => yScale(yAccessor(d)))
  const line = bounds.append("path")
                .attr("d", lineGenerator(dataset))
                .attr("fill","none")
                .attr("stroke", "#ff8c00")
                .attr("stroke-width", 2)

  const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
  const yAxis = bounds.append("g")
    .call(yAxisGenerator)
  const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat("%B-%d"))
  const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${
          dimensions.boundedHeight
        }px)`)

  const dots = bounds.selectAll("circle")
        .data(dataset)
        .enter().append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 5)
        .attr("fill", "cornflowerblue")

  const xAxisLabel = xAxis.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 5)
        .attr("fill", "black")
        .style("font-size", "1.4em")
        .html("Day")

 
        

  

  console.log(-dimensions.boundedHeight / 2, -dimensions.margin.left + 10)
  
  }

  

drawLineChart()