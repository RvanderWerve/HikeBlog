import { useContext, useEffect, useState } from "react";
import "./write.css";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

export default function Write() {
  const PF = "http://localhost:5000/images/";
  const [edtiMode, setEditMode]= useState(false);
  const location = useLocation();
    const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [day, setDay] = useState(0);
  const [dist, setDist] = useState(0);
  const [ascent, setAscent] = useState(0);
  const [hikeDate, setHikeDate] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("...");
  const [arriveAt, setArriveAt] = useState("...");
  const [area, setArea] = useState("...");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude]= useState("");
  const [gpxLink, setGpxLink] = useState("");
  const [gpxFile, setGpxFile] = useState(null);
  const [gpxFileLink, setGpxFileLink] = useState("");
  const [story1, setStory1] = useState("");
  const [story2, setStory2] = useState("");
  const [headPhoto, setHeadPhoto] = useState(null);
  const [headPhotoLink, setHeadPhotoLink] = useState("");
  const [photo1, setPhoto1] = useState(null);
    const [isPortraitPhoto1, setIsPortraitPhoto1] = useState(false);
  const [photo1Link, setPhoto1Link] = useState("");
  const [photo2, setPhoto2] = useState(null);
    const [isPortraitPhoto2, setIsPortraitPhoto2] = useState(false);
  const [photo2Link, setPhoto2Link] = useState("");
  const [natureText, setNatureText] = useState(null);
  const [naturePhoto, setNaturePhoto] = useState(null);
    const [isPortraitNaturePhoto, setIsPortraitNaturePhoto] = useState(false);
  const [naturePhotoLink, setNaturePhotoLink] = useState("");
  const [mealText, setMealText] = useState("");
  const [mealPhoto, setMealPhoto] = useState(null);
    const [isPortraitMealPhoto, setIsPortraitMealPhoto] = useState(false);
  const [mealPhotoLink, setMealPhotoLink] = useState("");
  const [shopText, setShopText] = useState("");
  const { user } = useContext(Context);

  //if there is a path, we are editing an existing post. Fill all useStates with postData
useEffect(()=>{
  if (path){
    setEditMode(true);
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPostUseStates(res);
      setPost(res.data);
    };
    getPost();
  }
  else{setEditMode(false);
  //For new post automatically determine next free day nr. (Can be overridden but must be unique)
  const getFreeDayNr = async ()=>{
  const res =await axiosInstance.get("/posts");
  const nextDay = (Math.max(...res.data.map(dayNr=>dayNr.day)))+1;
  setDay(nextDay)
  }
  getFreeDayNr();
}
},[path])


const setPostUseStates =(res)=>{
  setDay(res.data.day);
  setDist(res.data.dist)
  setAscent(res.data.ascent)
  setHikeDate(res.data.hikeDate)
  setLeaveFrom(res.data.leaveFrom)
  setArriveAt(res.data.arriveAt)
  setArea(res.data.area)
  setLatitude(res.data.latitude)
  setLongitude(res.data.longitude)
  setGpxLink(res.data.gpxLink)
  setGpxFileLink(res.data.gpxFile)
  setStory1(res.data.story1)
  setStory2(res.data.story2)
  setHeadPhotoLink(res.data.headPhoto)
  setPhoto1Link(res.data.photo1)
  setPhoto2Link(res.data.photo2)
  setNatureText(res.data.natureText)
  setNaturePhotoLink(res.data.naturePhoto)
  setMealText(res.data.mealText)
  setMealPhotoLink(res.data.mealPhoto)
  setShopText(res.data.shopText)
}

//create new post for dB and change file object to filename. In edit mode, filename is already returned (called link)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      day,
      dist,
      ascent,
      hikeDate,
      leaveFrom,
      arriveAt,
      area,
      latitude,
      longitude,
      gpxLink,
      gpxFile: gpxFileLink,
      story1,
      story2,
      headPhoto: headPhotoLink,
      photo1: photo1Link,
      photo2: photo2Link,
      natureText,
      naturePhoto: naturePhotoLink,
      mealText,
      mealPhoto: mealPhotoLink,
      shopText,
      username: user.username,

    };
    if (headPhoto) {
      const data =new FormData();
      const filename = (day.toString()) + headPhoto.name;
      data.append("name", filename);
      data.append("file", headPhoto);
      newPost.headPhoto = filename;

      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
   
    if (photo1) {
      const data =new FormData();
      const filename =(day.toString()) +photo1.name;
      data.append("name", filename);
      data.append("file", photo1);
      newPost.photo1 = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    if (photo2) {
      const data =new FormData();
      const filename = (day.toString()) + photo2.name;
      data.append("name", filename);
      data.append("file", photo2);
      newPost.photo2 = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    if (naturePhoto) {
      const data =new FormData();
      const filename = (day.toString()) + naturePhoto.name;
      data.append("name", filename);
      data.append("file", naturePhoto);
      newPost.naturePhoto = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    if (mealPhoto) {
      const data =new FormData();
      const filename = (day.toString()) + mealPhoto.name;
      data.append("name", filename);
      data.append("file", mealPhoto);
      newPost.mealPhoto = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    if (gpxFile) {
      const data =new FormData();
      const filename = (day.toString()) + gpxFile.name;
      data.append("name", filename);
      data.append("file", gpxFile);
      newPost.gpxFile = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }

if(!edtiMode){
  //if new post, use post command to store newPost
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  }
  else if(edtiMode){
    //in editmode, use put with ID to store newPost with all fields
     try {
      await axiosInstance.put(`/posts/${post._id}`, newPost);
      window.location.replace("/post/" + post._id);
    } catch (err) { }
  }
  };

  //get lat and lon for weather API
  const getCoord = async ()=> {
    navigator.geolocation.getCurrentPosition((postion)=>{
      setLatitude(postion.coords.latitude)
      setLongitude(postion.coords.longitude)
    })
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


  return (
    <div className="write">
      <h3 className="writeTitle">{edtiMode? 'Edit': 'Nieuwe'} etappe:</h3>
     <div className="writeSmallGroup">

      <div className=" writeSmallForm">
        <label className="smallLabel">Dag nr</label>
        <input
            type="number"
            placeholder={day}
            value={day}
            className="writeSmallInput"
            autoFocus={true}
            onChange={e=>setDay(e.target.value)}
          />
          </div>
        
        <div className="writeSmallForm">
        <label className="smallLabel">Afstand</label>        
        <input
            type="number"
            step="0.1"
            placeholder={dist}
            value={dist}
            className="writeSmallInput"
            autoFocus={true}
            onChange={e=>setDist(e.target.value)}
          />
        </div>
        <div className="writeSmallForm">
        <label className="smallLabel">Stijging</label>        
        <input
            type="number"
            placeholder={ascent}
            value={ascent}
            className="writeSmallInput"
            autoFocus={true}
            onChange={e=>setAscent(e.target.value)}
          />
        </div>
        <div className="writeSmallForm">
        <label className="smallLabel">Datum</label>        
        <input
            type="date"
            value={new Date(hikeDate).toLocaleDateString('en-CA' )}
            className="writeSmallInput dateInput"
            autoFocus={true}
            onChange={e=>setHikeDate(e.target.value)}
          />
        </div>
        </div>

     <div className="writeSmallGroup">
      <div className=" writeSmallForm">
        <label className="smallLabel">Vertrekplaats</label>
        <input
            type="text"
            placeholder={leaveFrom}
            value={leaveFrom}
            className="writeSmallInput locInput"
            autoFocus={true}
            onChange={e=>setLeaveFrom(e.target.value)}
          />
          </div>
        
        <div className="writeSmallForm">
        <label className="smallLabel">Bestemming</label>        
        <input
            type="text"
            placeholder={arriveAt}
            value={arriveAt}
            className="writeSmallInput locInput"
            autoFocus={true}
            onChange={e=>setArriveAt(e.target.value)}
          />
        </div>
        <div className="writeSmallForm">
        <label className="smallLabel">Gebied</label>        
        <input
            type="text"
            placeholder={area}
            value={area}
            className="writeSmallInput locInput"
            autoFocus={true}
            onChange={e=>setArea(e.target.value)}
          />
        </div>
        </div>

        <div className="writeSmallGroup">
          <div className="writeSmallForm">
          <label className="smallLabel">Latitude</label>        
        <input
            type="text"
            placeholder={latitude}
            value={latitude}
            className="writeSmallInput locInput"
            autoFocus={true}
            onChange={e=>setLatitude(e.target.value)}
          />
          </div>
        
        <div className="writeSmallForm">
          <label className="smallLabel">Longitude</label>        
        <input
            type="text"
            placeholder={longitude}
            value={longitude}
            className="writeSmallInput locInput"
            autoFocus={true}
            onChange={e=>setLongitude(e.target.value)}
          />
          </div>
          <div className="writeSmallForm">
          <button className="writeCoordButton"
          onClick={getCoord}>
          Coördinaten ophalen
        </button>
        </div>
          </div>
     
      <div className="writeSmallGroup">
        <div className="writeSmallForm">
          <input
            type="url"
            placeholder="Suunto link naar route"
            value={gpxLink}
            className="writeSuuntoInput "
            autoFocus={true}
            onChange={e => setGpxLink(e.target.value)}
          /></div>
        <div className="writeSmallForm">
          <input 
          type="file" 
          id="gpxInput"
          placeholder={gpxFile}
          className="writeSmallInput gpxInput writeCoordButton"
          autoFocus={true}
          onChange={(e)=>{setGpxFile(e.target.files[0])}}
          />
          </div>
          {gpxFile&&<div className="writeSmallForm smallLabel gpxFileShow ">
            {gpxFile.name}
          </div>}
          {!gpxFile&&gpxFileLink&&<div className="writeSmallForm smallLabel gpxFileShow">{gpxFileLink}</div>}
        <div className="writeSmallForm">
          <button className="writeCoordButton gpxButton">
            <label
            type="file"
            for="gpxInput"
            className="gpxLabel"
            >
            Gpx file upload        
            </label>
            </button>
        </div>
      </div>
      {headPhoto && 
        <img className="writePostHeadImg" src={URL.createObjectURL(headPhoto)} alt="" />
      }
      {!headPhoto&&headPhotoLink&&<img className="writePostHeadImg" src={PF+headPhotoLink} alt="" />}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="headPhotoInput"  className="smallLabel">
            <i className="writeIcon fas fa-light fa-camera"></i>
            Suunto foto
          </label>
          <input
            type="file"
            id="headPhotoInput"
            style={{ display: "none" }}
            onChange={(e) => setHeadPhoto(e.target.files[0])}
          />
          </div>
        <div className="writeFormGroup">
          <textarea
            value={story1}
            placeholder="Verhaal van de dag deel 1"
            type="text"
            className="writeInput writeText"
            onChange={e=>setStory1(e.target.value)}
          ></textarea>
        </div>
      {photo1 && ( <img className={`${!isPortraitPhoto1 ? 'writePostImg' : 'writePostImgPortrait'}`} src={URL.createObjectURL(photo1)} name="photo1" onLoad={handleImageLoad} alt="" />   )}
       {!photo1&&photo1Link&&<img className={`${!isPortraitPhoto1 ? 'writePostImg' : 'writePostImgPortrait'}`} src={PF+photo1Link}  name="photo1" onLoad={handleImageLoad} alt="" />}
        <div className="writeFormGroup">
          <label htmlFor="photo1Input"  className="smallLabel">
            <i className="writeIcon fas fa-light fa-camera"></i>
            Foto 1
          </label>
          <input
            type="file"
            id="photo1Input"
            style={{ display: "none" }}
            onChange={(e) => setPhoto1(e.target.files[0])}
          />
          </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Verhaal van de dag deel 2"
            value={story2}
            type="text"
            className="writeInput writeText"
            onChange={e=>setStory2(e.target.value)}
          ></textarea>
        </div>
       {photo2 && ( <img className={`${!isPortraitPhoto2 ? 'writePostImg' : 'writePostImgPortrait'}`} src={URL.createObjectURL(photo2)}  name="photo2" onLoad={handleImageLoad} alt="" />   )}
       {!photo2&&photo2Link&&<img className={`${!isPortraitPhoto2 ? 'writePostImg' : 'writePostImgPortrait'}`} src={PF+photo2Link}  name="photo2" onLoad={handleImageLoad} alt="" />}
 
        <div className="writeFormGroup">
          <label htmlFor="photo2Input"  className="smallLabel">
            <i className="writeIcon fas fa-light fa-camera"></i>
            Foto 2
          </label>
          <input
            type="file"
            id="photo2Input"
            style={{ display: "none" }}
            onChange={(e) => setPhoto2(e.target.files[0])}
          />
          </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Natuur bijzonderheden ..."
            value={natureText}
            type="text"
            className="writeInput writeAddText"
            onChange={e=>setNatureText(e.target.value)}
          ></textarea>
        </div>
    {naturePhoto && ( <img className={`${!isPortraitNaturePhoto ? 'writePostImg' : 'writePostImgPortrait'}`} src={URL.createObjectURL(naturePhoto)}  name="naturePhoto" onLoad={handleImageLoad} alt="" />   )}
       {!naturePhoto&&naturePhotoLink&&<img className={`${!isPortraitNaturePhoto ? 'writePostImg' : 'writePostImgPortrait'}`} src={PF+naturePhotoLink}  name="naturePhoto" onLoad={handleImageLoad} alt="" />}
 
        <div className="writeFormGroup">
          <label htmlFor="naturePhotoInput"  className="smallLabel">
            <i className="writeIcon fas fa-light fa-camera"></i>
            Foto natuur
          </label>
          <input
            type="file"
            id="naturePhotoInput"
            style={{ display: "none" }}
            onChange={(e) => setNaturePhoto(e.target.files[0])}
          />
          </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Eten / slapen ..."
            value={mealText}
            type="text"
            className="writeInput writeAddText"
            onChange={e=>setMealText(e.target.value)}
          ></textarea>
        </div>
       {mealPhoto && ( <img className={`${!isPortraitMealPhoto ? 'writePostImg' : 'writePostImgPortrait'}`} src={URL.createObjectURL(mealPhoto)}  name="mealPhoto" onLoad={handleImageLoad} alt="" />   )}
       {!mealPhoto&&mealPhotoLink&&<img className={`${!isPortraitMealPhoto ? 'writePostImg' : 'writePostImgPortrait'}`} src={PF+mealPhotoLink}  name="mealPhoto" onLoad={handleImageLoad} alt="" />}
 
        <div className="writeFormGroup">
          <label htmlFor="mealPhotoInput"  className="smallLabel">
            <i className="writeIcon fas fa-light fa-camera"></i>
            Foto maaltijd /accomodatie
          </label>
          <input
            type="file"
            id="mealPhotoInput"
            style={{ display: "none" }}
            onChange={(e) => setMealPhoto(e.target.files[0])}
          />
          </div>
          <div className="writeFormGroup">
          <textarea
            placeholder="Shop info ..."
            value={shopText}
            type="text"
            className="writeInput writeAddText"
            onChange={e=>setShopText(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publiceer
        </button>
      </form>
    </div>
  );
}
