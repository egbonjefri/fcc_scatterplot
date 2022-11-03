import {useState,useRef,useEffect} from 'react'
import * as d3 from 'd3'




function App() {

  const [dataset, setDataset] = useState([]);
  const ref = useRef()
  useEffect(()=> {
      setTimeout(()=>{
        const loadData = async() => {
        const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
        const data = await response.json()
        setDataset(data)
        }
        loadData()
      }, 500)
  },[dataset.length])

  useEffect(()=> {
    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    const parseTime = d3.timeParse('%Y')
    const dates = [];
        // eslint-disable-next-line
    dataset.map((item)=>{dates.push(parseTime(item.Year))})
    const domain = d3.extent(dates)

    var x = d3.scaleTime()
    .range([ 0, height ])
    .domain(domain)

    var y = d3.scaleBand()
    .range([ 0, 350 ])
    .domain(dataset.map(function(d) { return d.Time; }))
    ;
    

    const svgElement = d3.select(ref.current);
    const tooltip = d3.select('body').append('div').attr('class','tooltip-style').style('opacity',0)
    svgElement.selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', d=> x(parseTime(d.Year)))
    .attr('cy', d=> y(d.Time)-350)
    .attr('r', 5)
    .style('fill', function(d){
      if (d.Doping === ''){
        return 'tomato'
      }
      else {
        return 'cornflowerblue'
      }
    })
      .on('mousemove', function(d,event){
        d3.select(this).attr('r', 10).style('fill', 'gray')
        tooltip.style('opacity',1);
        tooltip.html(`${event.Name}: ${event.Nationality} <br>Year: ${event.Year}, Time: ${event.Time}<br><br> ${event.Doping}`)
        tooltip.style('left', (d.pageX-20)+'px')
        tooltip.style('top', ((d.pageY)-35)+'px')
      })
      .on('mouseout', function(d){
        tooltip.style('opacity',0)
        d3.select(this).attr('r', 5).style('fill', function(d){
          if (d.Doping === ''){
            return 'tomato'
          }
          else {
            return 'cornflowerblue'
          }
        })
  
      })
    svgElement.append("g")
    .call(d3.axisBottom(x))
    svgElement.append("g")
    .call(d3.axisLeft(y).tickValues(y.domain().filter((d,i)=>{return !(i%3)})))
    .attr('transform', 'translate(-15,-356)')
    svgElement.append('rect').attr('x',600).attr('y',-300).attr('width',10).attr('height',10).style('fill','tomato')
    svgElement.append('rect').attr('x',600).attr('y',-280).attr('width',10).attr('height',10).style('fill','cornflowerblue')
    svgElement.append('text').attr('x',613).attr('y',-295).text('No doping allegations').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    svgElement.append('text').attr('x',613).attr('y',-275).text('Riders with doping doping allegations').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    svgElement.append('text')
    // eslint-disable-next-line
   .attr('transform', 'translate(-60'+' ,'+(-200)+
 ')rotate(-90)')
   .style('text-anchor', 'middle')
   .text('Time (Minutes)')
   .style('font',"14px sans-serif")
   .attr('fill', 'gray')
   svgElement.append('text')
   .attr('transform', 'translate('+(width/1.1)+' ,'+(81)+
 ')')
   .style('text-anchor', 'middle')
   .text('Created by @egbonjefri for freeCodeCamp')
   .style('font',"10px sans-serif")
   .attr('fill', 'gray')
   svgElement.append('text')
        // eslint-disable-next-line
  .attr('transform', 'translate(320'+' ,'+(-420)+
  ')')
    .style('text-anchor', 'middle')
    .text('Doping in Professional Cycling')
    .style('font',"26px sans-serif")
    .attr('fill', 'gray')
    svgElement.append('text')
    // eslint-disable-next-line
.attr('transform', 'translate(320'+' ,'+(-400)+
')')
.style('text-anchor', 'middle')
.text('35 Fastest times up Alpe d\'Huez')
.style('font',"16px sans-serif")
.attr('fill', 'gray')
  }, [dataset])


  return (
    <div className="App">
         <svg ref={ref} 
    viewBox='-200 -500 1000 600'>
      
    </svg>
    </div>
  );
}

export default App;
