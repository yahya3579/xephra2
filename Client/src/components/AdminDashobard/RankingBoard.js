import {React, useEffect} from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { getTopRanking } from "../../redux/features/rankingSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading/Loading";
import {Link} from 'react-router-dom';


// Register the required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const RankingBoard = ({ dark }) => {

  const dispatch = useDispatch();
  const { topranks, loading, error } = useSelector((state) => state.ranking);

  useEffect(() => {
    dispatch(getTopRanking());
  }, [dispatch]);



  const barChartData = {
    labels: topranks.map((user) => user?.userProfile?.fullName),
    datasets: [
      {
        label: "Scores",
        data: topranks.map((user) => user?.weightedScore),
        backgroundColor: "#854951",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#622D37", // Change X-axis label color
        },
      },
      y: {
        ticks: {
          color: "#622D37", // Change Y-axis label color
        },
      },
    },
  };

  const doughnutData = (progress) => ({
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ["#854951", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  });

  if (loading) {
    return <Loading />;
  }

  const maxWightedScore = Math.max(
    ...topranks.map((user) => user.weightedScore)
  );

  return (
    <div className={`min-h-screen p-8 shadow-2xl shadow-gray-950 rounded-xl backdrop-blur-sm bg-[#492f3418] bg-opacity-[.06] ${
      dark
        ? "":""}`}>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">
        Ranking Board
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     
        <div className="bg-gradient-to-r from-[#D19F43] via-[#B2945C] via-[#C9B796] via-[#B39867] to-[#D4AD66] shadow-md rounded-lg p-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center text-[#622D37]" style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}>
            Top Players
          </h2>
          <div className="flex justify-end">
              <Link to="/dashboard/allranking">See All</Link>
            </div>
          <div>
            {topranks && topranks.length > 0
              ? topranks.map((user, index) => {
                  const progress =
                    (user?.weightedScore / maxWightedScore) * 100;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex w-full items-center space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                          <span className="text-base lg:text-2xl font-bold text-[#622D37]" style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}>
                            #{index + 1}
                          </span>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="flex items-center justify-between w-full">
                            <h3 className="text-sm lg:text-lg font-medium" style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}>
                              {user?.userProfile?.fullName}
                            </h3>
                            <div>
                              <p className="text-xs lg:text-lg text-black">
                                Score: {user?.weightedScore}
                              </p>
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-[#622D37] h-2 rounded-full transition-all duration-300 text-center text-xs font-bold text-white"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "Currently we don't have top 5 players"}

        
          </div>
        </div>

        {/* Scores Overview Section */}
        <div className="bg-gradient-to-r from-[#D19F43] via-[#B2945C] via-[#C9B796] via-[#B39867] to-[#D4AD66] shadow-md rounded-lg p-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center text-[#622D37]" style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}>
            Scores Overview
          </h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default RankingBoard;
