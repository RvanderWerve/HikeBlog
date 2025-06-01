import lakedistrictPanorama from '../../images/lakedistrictPanorama.png'
import c2cmap2 from '../../images/c2cmap2.png'
import heathermoor_ls from '../../images/heathermoor_ls.jpg'
import "./hike.css"

export default function Hike(){

    return(
        <div className="hike">
            <div className='hikeWrapper'>
                <img className='hikeImg' src={lakedistrictPanorama} alt="" />
                <h3 className="hikeStoryTitle">Wainwright's Coast to Coast Walk of England</h3>
                <p className='hikeStory'>De Coast to Coast voert door Noord-Engeland en doorsnijdt het Britse eiland ongeveer halverwege. De wandelroute doorkruist drie natuurgebieden, van west naar oost zijn dat het Lake District, The Yorkshire Dales en The North York Moors. 
                De klasieke looprichting is van west naar oost. De start is in St Bees en na zo'n 300 km eindig je in Robin Hood's Bay. Traditie is het teen-en-steen ritueel, dip je teen in de Ierse zee en neem een mooi steentje mee. Aan het eind van de hike gooi je het steentje in de Noordzee, terwijl je daar ook weer even in de zee staat.</p>
                <img className='hikeImg' src={c2cmap2} alt="" />
                <h3 className="hikeStoryTitle">3 National Parks</h3>
                <p className='hikeStory'>De C2C zou in 2025 een National Trail worden, maar dat is uitgesteld tot 2026. Het betekent o.a. dat de bewegwijzering hier en daar te wensen over laat en dat paden soms nog verbetering nodig hebben. Ondanks dat is het een van de populairste langeafstand wandelroutes in Engeland en zijn er vele voorzieningen.
Wat het tot een van de mooiste wandelingen van Engeland maakt is de enorme variatie aan landschappen en dorpjes. 
</p>
<p className='hikeStory'>Het Lake District kent de spectaculairste uitzichten en landschappen door de combinatie van hoge bergen, rivieren en meren. De bergen van het Lake District zijn misschien niet hoog, maar wel ruig. De hoogste berg van Engeland is Scafell Pike (978 m). Het gebied is berucht om het weer. Het kan er veel regenen en sneeuwen Tot 3000 mm per jaar (4x zo veel als in Nederland!).
Daarna de Yorkshire Dales met grillige kalksteen formaties en schilderachtige ‘veldschuren’ en een netwerk van stenen stapelmuurtjes die typisch zijn voor dit gebied. De North York Moors tenslotte bestaan uit heuvels, hoogvlaktes, graslanden, bos, kust en de beroemde 'heather moors' (heideveen): uitgestrekte glooiende heidevelden helemaal tot aan de Noordzeekust. Het is een van de meest uitgestrekte heidevelden in de wereld met een geheel eigen flora en fauna.
</p>
<img className='hikeImg' src={heathermoor_ls} alt="" />

<h3 className="hikeStoryTitle">Etappe-indeling</h3>

<p className='hikeStory'>De meeste indelingen beginnen met enkele lange etappes die ook nog veel hoogtemeters hebben. Dan kom je op 14 tot 16 etappes. Deze indeling heeft ongetwijfeld te maken met de beschikbaarheid van accommodaties voor overnachtingen. Aangezien wij op pad gaan met tent en complete kampeeruitrusting, hebben we de mogelijkheid om alternatieve overnachtingen te doen. Ergens wild kamperen midden in de natuur. Tegelijkertijd is het ook zwaarder om te lopen met volle bepakking, dus fijn dat we een alternatieve route indeling gevonden hebben die 17 etappes telt. De eerste 2 etappes worden bijvoorbeeld in 3 dagen verdeeld.
</p>
<p className='hikeStory'>
Hoe het allemaal precies uit zal gaan pakken? Dat gaan we in deze blog bijhouden. Zowel korte dagverslagen met foto's als nuttige informatie voor mensen die ook de C2C willen gaan lopen met als insteek meestal te gaan kamperen. Waar hebben wij overnacht en waar konden we eten kopen bijvoorbeeld.
</p>
<p className='hikeStory'>
Tot slot houden we voor de natuurliefhebbers ook per dag nog enkele hoogtepunten in de flora en fauna bij die ons zijn opgevallen.</p>
            </div>
        </div>
    )
}