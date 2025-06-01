import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import WeatherIcon from "./WeatherIcon";
import WindIcon from "./WindIcon";
import "./singlePost.css";
import gpxLogo from '../../images/gpxLogo.png';
import gpxIcon from '../../images/gpxIcon.jpg'
import { axiosInstance } from "../../config";


export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [day, setDay] = useState();
  const [dist, setDist] = useState("");
  const [ascent, setAscent] = useState("");
  const [hikeDate, setHikeDate] = useState(new Date());
  const [leaveFrom, setLeaveFrom] = useState("");
  const [arriveAt, setArriveAt] = useState("");
  const [area, setArea] = useState("");
  const [coords, setCoords]= useState({})
  const [gpxLink, setGpxLink] = useState("");
  const [gpxFile, setGpxFile] = useState(null);
  const [story1, setStory1] = useState("");
  const [story2, setStory2] = useState("");
  const [headPhoto, setHeadPhoto] = useState(null);
  const [photo1, setPhoto1] = useState(null);
  const [isPortraitPhoto1, setIsPortraitPhoto1] = useState(false);
  const [photo2, setPhoto2] = useState(null);
  const [isPortraitPhoto2, setIsPortraitPhoto2] = useState(false);
  const [natureText, setNatureText] = useState(null);
  const [naturePhoto, setNaturePhoto] = useState(null);
  const [isPortraitNaturePhoto, setIsPortraitNaturePhoto] = useState(false);
  const [mealText, setMealText] = useState(null);
  const [mealPhoto, setMealPhoto] = useState(null);
  const [isPortraitMealPhoto, setIsPortraitMealPhoto] = useState(false);
  const [shopText, setShopText] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [windDir, setWindDir] = useState(null);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [sumDistance, setSumDistance] = useState();
  const [sumAscent, setSumAscent] = useState();


    useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setPostUseStates(res)
      };
    getPost();
  }, [path]);



  useEffect(() => {
    // Setting the weather fetch options
    const options = {
      method: 'GET', headers:
        { accept: 'application/json' }
    };
// parameters for retrieving weather
    const params = {
      "latitude": coords.latitude,
      "longitude": coords.longitude,
      "start_date": new Date(hikeDate).toLocaleDateString('en-CA' ),
      "end_date":new Date(hikeDate).toLocaleDateString('en-CA' ),
      "daily": ["weather_code", "temperature_2m_max", "rain_sum", "sunshine_duration", "temperature_2m_min", "wind_direction_10m_dominant", "wind_speed_10m_max", "sunrise", "sunset"],
      "hourly": ["weather_code", "rain"],
      "timezone": "auto",
  };
    const url = "https://archive-api.open-meteo.com/v1/archive?";
 
    // Fetching weather data
    fetch(url + new URLSearchParams(params).toString(), options)
      .then(response => response.json())
      .then(data => {
        // Set the weather data to state
        setWeatherData(data);
        console.log("data:")
        console.log(data)
        setWindDir(data.daily.wind_direction_10m_dominant[0]);
        const RiseDate = new Date(data.daily.sunrise);
        const RiseTime = RiseDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setSunrise(RiseTime);
        const SetDate = new Date(data.daily.sunset);
        const SetTime = SetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setSunset(SetTime);
      })
      .catch(err => {
        // Set the error to state if there is an error
        setWeatherError(err);
        console.error(err);
      });    
  }, [coords, hikeDate]);

  //calculate sum of distance and ascent of all stages up to current one
useEffect(()=>{
    const getPosts = async () => {
      const res = await axiosInstance.get("/posts/");
      let sumDist = 0;
      let sumAsc = 0;
      for (let i=0; i<res.data.length;i++){
        if(res.data[i].day<=day){
          sumDist=sumDist+res.data[i].dist
          sumAsc = sumAsc+res.data[i].ascent
        }
      }
      setSumDistance(sumDist)
      setSumAscent(sumAsc)

      };
    getPosts();
},[day])


  const setPostUseStates =(res)=>{
    setDay(res.data.day);
    setDist(res.data.dist)
    setAscent(res.data.ascent)
    setHikeDate(res.data.hikeDate)
    setLeaveFrom(res.data.leaveFrom)
    setArriveAt(res.data.arriveAt)
    setArea(res.data.area)
    setCoords({latitude:res.data.latitude, longitude:res.data.longitude})
    setGpxLink(res.data.gpxLink)
    setGpxFile(res.data.gpxFile)
    setStory1(res.data.story1)
    setStory2(res.data.story2)
    setHeadPhoto(res.data.headPhoto)
    setPhoto1(res.data.photo1)
    setPhoto2(res.data.photo2)
    setNatureText(res.data.natureText)
    setNaturePhoto(res.data.naturePhoto)
    setMealText(res.data.mealText)
    setMealPhoto(res.data.mealPhoto)
    setShopText(res.data.shopText)
  }


//Check if photo is portrait or landscape for styling
  const handleImageLoad = (e) => {
    const naturalHeight = e.target.naturalHeight;
    const naturalWidth = e.target.naturalWidth;
    const isPortrait = naturalHeight / naturalWidth > 1;
    const photoName = e.target.name;
    switch (photoName) {
      case 'photo1':
        setIsPortraitPhoto1(isPortrait);
        break;
      case 'photo2':
        setIsPortraitPhoto2(isPortrait);
        break;

      case 'naturePhoto':
        setIsPortraitNaturePhoto(isPortrait);
        break;

      case 'mealPhoto':
        setIsPortraitMealPhoto(isPortrait);
        break;
    }
  };


  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
      });
      window.location.replace("/");
    } catch (err) { }
  };



  return (

    <div className="singlePost">
      <div className="singlePostWrapper">

        <div>
          <h1 className="singlePostTitle">
            {"Dag " + day + ": " + leaveFrom + " - " + arriveAt + ", " + area}
            { user && (
              <div className="singlePostEdit">
                <Link className="link" to={`/edit/${post._id}`}>
                <i
                  className="singlePostIcon singlePostIconEdit far fa-edit"
                ></i>
                </Link>
                <i
                  className="singlePostIcon singlePostIconDelete far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
          <div className="singlePostSubTitle">
            <h3> {"Afstand: " + dist + "km \xa0"}</h3> <h3>{"Stijging: " + ascent + "m\xa0 "}</h3>
            <div className="weatherIconTemp"> {weatherData&&weatherData.hourly&&<WeatherIcon weatherData = {weatherData}/>}
              <h3 className="singlePostSubTitleH3">{
               weatherData&&weatherData.daily && weatherData.daily.temperature_2m_max + "\u00b0C"}</h3></div><h3> {(hikeDate)=>{hikeDate.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}}</h3>
          </div>
        </div>


        {headPhoto&&<img className="singlePostHeadImg" src={PF+headPhoto} alt="" ></img>}
        <h3 className="singlePostStoryTitle">De wandeling</h3>

        <p className="singlePostStory">{story1}</p>
        {photo1 && <img className={`${!isPortraitPhoto1 ? 'singlePostImg' : 'singlePostImgPortrait'}`} name="photo1" onLoad={handleImageLoad} src={PF+photo1} alt=""></img>}

        <p className="singlePostStory">{story2}</p>
        {photo2 && <img className={`${!isPortraitPhoto2 ? 'singlePostImg' : 'singlePostImgPortrait'}`} name="photo2" onLoad={handleImageLoad} src={PF+photo2} alt=""></img>}

        <h3 className="singlePostStoryTitle">Natuur</h3>
        <p className="singlePostStory">{natureText}</p>
        {naturePhoto && <img className={`${!isPortraitNaturePhoto ? 'singlePostImg' : 'singlePostImgPortrait'}`} name="naturePhoto" onLoad={handleImageLoad} src={PF+naturePhoto} alt=""></img>}

        <h3 className="singlePostStoryTitle">{"Wat schaft de pot vandaag? \xa0\xa0\xa0\xa0... en waar slapen?"}</h3>
        <p className="singlePostStory">{mealText}</p>
        {mealPhoto && <img className={`${!isPortraitMealPhoto ? 'singlePostImg' : 'singlePostImgPortrait'}`} name="mealPhoto" onLoad={handleImageLoad} src={PF+mealPhoto} alt=""></img>}

        {shopText && <h3 className="singlePostStoryTitle">{"Shop info"}</h3>}
        {shopText && <p className="singlePostStory">{shopText}</p>}
        {gpxLink && <h3 className="singlePostStoryTitle">{"Route animatie by Suunto"}</h3>}
        {gpxLink && <p className="singlePostStory">Kaart met 3D animatie van de gelopen route.</p>}
        {gpxLink && <a href={gpxLink} target="_blank" rel="noreferrer"><img src={gpxLogo} className="animLogo" alt="" /> </a>}
        {gpxFile&& <p className="singlePostStory">Download GPX file van deze etappe.</p>}
        {gpxFile&& <a href={PF+gpxFile} download={gpxFile} > <img src={gpxIcon} className="downlLogo" alt="" /></a>}
        
        
        <h3 className="singlePostStoryTitle">Voor de statistiek</h3>
        <ul className="singlePostStatistics">
          {weatherData&&weatherData.daily&&<li>Maximum temperatuur: {weatherData.daily.temperature_2m_max + " \u00b0C"}</li>}
          {weatherData&&weatherData.daily&&<li>Minimum temperatuur: {weatherData.daily.temperature_2m_min + " \u00b0C"}</li>}
          {weatherData&&weatherData.daily&&<li>Windsnelheid: {weatherData.daily.wind_speed_10m_max + " km/u"}</li>}
          {windDir&&<div  className="windIconSpeed"><li><WindIcon windDir={windDir}/> </li></div>}
          {weatherData&&weatherData.daily&&<li>Uren zonneschijn: {Math.round(weatherData.daily.sunshine_duration / 3600)}</li>}
          {weatherData&&weatherData.daily&&<li>Regen: {weatherData.daily.rain_sum } mm</li>}
          {weatherData&&<li>Zon op: {sunrise}  u</li>}
          {weatherData&& <li>Zon onder: {sunset } u</li>}
          {weatherError&&<li>Fout bij het lezen van de weergegevens. </li>}
          <li>Dagafstand: {dist} km</li>
          {sumDistance&&<li>Afstand tot en met deze etappe: {sumDistance} km</li>}
          <li>Stijging deze etappe: {ascent} m</li>
          {sumAscent&&<li>Stijging tot en met deze etappe: {sumAscent} m</li>}
        </ul>



        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Auteur:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
        </div>

      </div>

    </div>
  );
}
