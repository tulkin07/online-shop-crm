const countries = [
    {
      flag: "🇺🇸",
      users: "30k",
      country: "US",
      color: "bg-[#6467F2]",
      width: "w-[55px]",
      percent: "25.8%",
      positive: true,
    },
    {
      flag: "🇧🇷",
      users: "30k",
      country: "Brazil",
      color: "bg-[#6467F2]",
      width: "w-[38px]",
      percent: "15.8%",
      positive: false,
    },
    {
      flag: "🇦🇺",
      users: "25k",
      country: "Australia",
      color: "bg-[#6467F2]",
      width: "w-[60px]",
      percent: "35.8%",
      positive: true,
    },
  ];
  
  const bars = [
    25, 14, 20, 10, 28, 18, 23, 15, 8, 22, 12, 18, 28, 14, 20, 10, 27,
    16, 12, 25, 15, 32, 12, 20, 35, 15, 28, 18, 10, 22, 12, 30,
  ];
  
  export default function UsersInfo() {
    return (
      <div className="col-span-4 rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">
  
        {/* Header */}
        <div className="px-4 pt-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-[#6467F2]">
                Users in last 30 minutes
              </p>
  
              <h2 className="text-[22px] font-semibold text-[#23272E]">
                21.5K
              </h2>
            </div>
  
            <button className="text-[#6A717F]">
              <i className="bi bi-three-dots-vertical"></i>
            </button>
          </div>
  
          {/* Users per minute */}
          <p className="mt-3 text-[10px] text-[#6A717F]">
            Users per minute
          </p>
  
          {/* Bars */}
          <div className="mt-2 flex h-[35px] items-end gap-[3px]">
            {bars.map((height, index) => (
              <div
                key={index}
                className="w-1.25 rounded-t-xs bg-[#4DB27A]"
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </div>
  
        {/* Country header */}
        <div className="mt-3 flex justify-between border-b border-[#E5E7EB] px-4 pb-1">
          <span className="text-[11px] font-medium text-[#23272E]">
            Sales by Country
          </span>
  
          <span className="text-[11px] font-medium text-[#23272E]">
            Sales
          </span>
        </div>
  
        {/* Countries */}
        <div className="bg-[#F9FAFB] px-3">
  
          {countries.map((item, index) => (
            <div
              key={index}
              className="relative flex h-[48px] items-center border-b border-[#E5E7EB]"
            >
  
              {/* Flag */}
              <div className="w-[38px] text-[25px]">
                {item.flag}
              </div>
  
              {/* User info */}
              <div className="w-[62px]">
                <p className="text-[11px] font-medium text-[#23272E]">
                  {item.users}
                </p>
  
                <p className="text-[9px] text-[#6A717F]">
                  {item.country}
                </p>
              </div>
  
              {/* Progress */}
              <div className="flex-1">
                <div className="h-[4px] w-[80px] rounded-full bg-[#E5E7EB]">
                  <div
                    className={`h-full ${item.width} rounded-full ${item.color}`}
                  />
                </div>
              </div>
  
              {/* Percent */}
              <div className="w-[55px] text-right">
                <span
                  className={`text-[9px] ${
                    item.positive
                      ? "text-[#21C45D]"
                      : "text-[#F04444]"
                  }`}
                >
                  {item.positive ? "⌃" : "⌄"} {item.percent}
                </span>
              </div>
            </div>
          ))}
        </div>
  
        {/* Button */}
        <div className="px-3 py-2">
          <button className="w-full rounded-full border border-[#6467F2] py-[4px] text-[10px] text-[#6467F2] transition hover:bg-[#6467F2] hover:text-white">
            View Insight
          </button>
        </div>
  
      </div>
    );
  }
