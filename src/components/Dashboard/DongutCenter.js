import React from 'react';
const formatNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0
  }).format;
function calculateTotal(pieChart) {
    return formatNumber(pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0));
}
export default function TooltipTemplate(pieChart) {
    //   const country = pieChart.getAllSeries()[0].getVisiblePoints()[0].data.district;
    return (
        <svg>
            <text textAnchor="middle" x="100" y="120" style={{ fontSize: 50, fill: '#494949' }}>
                <tspan x="100" dy="20px" style={{ fontWeight: 600 }}>{
                    calculateTotal(pieChart)
                }</tspan>
            </text>
        </svg>
    );
}
