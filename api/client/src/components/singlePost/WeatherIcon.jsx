import { useEffect, useState } from 'react'
import "./singlePost.css";
import d01 from '../../images/weerIcons/d01.svg'
import d02 from '../../images/weerIcons/d02.svg'
import d03 from '../../images/weerIcons/d03.svg'
import d09 from '../../images/weerIcons/d09.svg'
import d10 from '../../images/weerIcons/d10.svg'



export default function WeatherIcon (weatherData){
    const [weatherIcon, setWeatherIcon] = useState(d02);
    const [hourWeatherCodes, setHourWeatherCodes]=useState([]);

    useEffect(()=>{
     //create improved day weather code from hourly weathercodes during daytime
     const hourCodes = weatherData.weatherData.hourly.weather_code;
     const dayhourCodes =hourCodes.slice(8,19); //lose evening hours + lose night hours
     setHourWeatherCodes(dayhourCodes)
   
    },[weatherData.weatherData.hourly.weather_code]);


useEffect(()=>{
     //count all codes to determine dominant code
     let sun = 0;
     let partcloud = 0;
     let cloud = 0;
     let rain = 0;
     let shower = 0;
     hourWeatherCodes.forEach((item)=>{
     if(item<2)sun+=1;
     else if(item===2)partcloud+=1;
     else if (item<10)cloud+=1;
     else if(item<70) rain+=1;
     else if(item<99)shower+=1;
     });
     const hourRain = weatherData.weatherData.hourly.rain;
const dayhourRain =hourRain.slice(8,19); //lose night hours +lose evening hours
let sumRain = 0;
// calculate sum rain during day
dayhourRain.forEach( num => {
  sumRain += num;
});
const sunDuration = Math.round(weatherData.weatherData.daily.sunshine_duration / 3600);
if(sun>5){setWeatherIcon(d01) 
   // console.log("zonnig")
}
else if(partcloud>5){setWeatherIcon(d02);
//console.log("partcloud")
}

else if((sumRain>1.5&&sumRain<4&&sunDuration>=5)||shower>5){
    setWeatherIcon(d10);
    //console.log("buien")
}
else if((sumRain>1.5&&sunDuration<5)||sumRain>=4||rain>5){
    setWeatherIcon(d09);
    //console.log("regen")
}
else if(cloud>5){
    setWeatherIcon(d03);
//console.log("cloud")
}
else {setWeatherIcon(d03)
//console.log("cloud") 
//default case
}
},[hourWeatherCodes,weatherData.weatherData.daily.sunshine_duration,weatherData.weatherData.hourly.rain]);

const returnIcon = ()=>{
return <img className='weatherIcon' src={weatherIcon} alt=''/>
}
const icon = returnIcon();

    return <div>{icon}</div> ;

}