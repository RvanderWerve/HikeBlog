import wind_e from '../../images/windIcons/wind_e.jpg'
import wind_n from '../../images/windIcons/wind_n.jpg'
import wind_ne from '../../images/windIcons/wind_ne.jpg'
import wind_nw from '../../images/windIcons/wind_nw.jpg'
import wind_w from '../../images/windIcons/wind_w.jpg'
import wind_s from '../../images/windIcons/wind_s.jpg'
import wind_sw from '../../images/windIcons/wind_sw.jpg'
import wind_se from '../../images/windIcons/wind_se.jpg'
import { useEffect, useState } from 'react'
import "./singlePost.css";




export default function WindIcon(windDir){

    const [windIcon, setWindIcon] = useState(wind_nw);

    useEffect(()=>{
         switch (true){
            case windDir.windDir<23:
                setWindIcon(wind_n);
                break;
            case windDir.windDir<68:
                setWindIcon(wind_ne);
                break;
            case windDir.windDir<113:
                setWindIcon(wind_e);
                break;
            case windDir.windDir<158:
                setWindIcon(wind_se);
                break;
            case windDir.windDir<203:
                setWindIcon(wind_s);
                break;
            case windDir.windDir<248:
                setWindIcon(wind_sw);
                break;
            case windDir.windDir<293:
                    setWindIcon(wind_w);
                    break;
            case windDir.windDir<338:
                    setWindIcon(wind_nw);
                    break;
            default: setWindIcon(wind_n);
        }
    },[windDir.windDir])

    return <div> <img className='windIcon' src={windIcon} alt=''/></div>

}