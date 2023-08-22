import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAxiosFetch from '../../../hooks/useAxiosFetch';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];







const Chart = () => {
    const axiosFetch = useAxiosFetch();
    const [data,setData] = useState([])
    useEffect(()=>{
        axiosFetch.get('/lowest-products')
        .then(res=>{
            setData(res?.data)
            console.log(data)
        })
    },[])

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (data) => {
        const { fill, x, y, width, height } = data;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };
    
    return (
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={data?.name} />
        <YAxis />
        <Bar dataKey={data?.availableQuantity} fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    );
};

export default Chart;