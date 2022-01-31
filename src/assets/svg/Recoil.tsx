export default function Recoil(stat: { [key: string]: number }) {
   const recoilStat = stat.recoilStat

   const xr = 1 + Math.cos(((-20 - recoilStat * 0.6) * Math.PI) / 180),
      yr = 1 + Math.sin(((-20 - recoilStat * 0.6) * Math.PI) / 180),
      xl = 2 - xr,
      x = Math.sin(((5 + recoilStat) * Math.PI) / 10) * (100 - recoilStat)
   return (
      <svg height='12' viewBox='0 0 2 1'>
         <circle r='1' cx='1' cy='1' fill='rgba(24, 30, 37, 1)'></circle>
         <path
            style={{ transform: `rotate(${x * 0.8}deg)`, transformOrigin: '50% 100%' }}
            d={`M 1 1 L ${xl} ${yr} A 1 1 0 0 1 ${xr} ${yr} Z`}
            fill='#FFF'
         ></path>
      </svg>
   )
}
