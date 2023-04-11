const data = [
  {
    city: "My Location",
    temperature: 63,
    state: "Clear",
    time: "11:31 PM",
    color: "from-slate-900 to-slate-700"
  },
  {
    city: "New York",
    temperature: 52,
    state: "Clear",
    time: "12:23 AM",
    color: "from-gray-800 to-gray-500"
  },
  {
    city: "London",
    temperature: 44,
    state: "Rainy",
    time: "12:23 PM",
    color: "from-blue-700 to-sky-500"
  },
  {
    city: "Cairo",
    temperature: 89,
    state: "Sunny",
    time: "12:23 PM",
    color: "from-blue-600 to-sky-300"
  },
]

const WeatherList = () => {
  return (
     <div className="my-8 flex flex-col gap-2">
      {data.map((item) => (
        <div key={item.city} className={`flex justify-between rounded-3xl bg-gradient-to-br text-white p-4 md:px-8
          ${item.color}
        `}>
          <div>
            <p className="text-xl font-bold m-0 leading-tight">{item.city}</p>
            <p className="text-sm font-medium m-0 mb-5 opacity-75 leading-tight">{item.time}</p>
            <p className="text-sm font-medium mt-auto mb-0">{item.state}</p>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-5xl m-0">{item.temperature}°</p>
            <p className="text-sm font-medium mt-auto mb-0 opacity-75">
              H:{item.temperature + 7}°
              L:{item.temperature - 7}°
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherList;
