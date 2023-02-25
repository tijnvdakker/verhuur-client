import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function StockGraph({stockData}) {
    return (
        <div className="chart-container">
            <Line
                data={stockData}
                options={{
                    animation: false,
                    plugins: {
                      title: {
                        display: true,
                        text: "Totale voorraad per dag, overzicht van de laatste 90 dagen"
                      }
                    }
                }}
            />
        </div>
    )
}

export default StockGraph;