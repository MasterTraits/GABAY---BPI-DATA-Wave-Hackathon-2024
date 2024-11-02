import { Line } from "react-chartjs-2";

function line() {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
          }
        }}
      />
    </div>
  );
}