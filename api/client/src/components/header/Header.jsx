import "./header.css";
import hprofiel1 from '../../images/hprofiel1.png'
import hprofiel2 from '../../images/hprofiel2.png'
import hprofiel3 from '../../images/hprofiel3.png'
import hprofiel4 from '../../images/hprofiel4.png'
import hprofiel5 from '../../images/hprofiel5.png'
import hprofiel6 from '../../images/hprofiel6.png'
import hprofiel7 from '../../images/hprofiel7.png'
import hprofiel8 from '../../images/hprofiel8.png'
import hprofiel9 from '../../images/hprofiel9.png'
import hprofiel10 from '../../images/hprofiel10.png'
import hprofiel11 from '../../images/hprofiel11.png'
import hprofiel12 from '../../images/hprofiel12.png'
import hprofiel13 from '../../images/hprofiel13.png'
import hprofiel14 from '../../images/hprofiel14.png'
import hprofiel15 from '../../images/hprofiel15.png'
import hprofiel16 from '../../images/hprofiel16.png'
import hprofiel17 from '../../images/hprofiel17.PNG'

const hImageArray = [
  hprofiel1,
  hprofiel2,
  hprofiel3,
  hprofiel4,
  hprofiel5,
  hprofiel6,
  hprofiel7,
  hprofiel8,
  hprofiel9,
  hprofiel10,
  hprofiel11,
  hprofiel12,
  hprofiel13,
  hprofiel14,
  hprofiel15,
  hprofiel16,
  hprofiel17
]

export default function Header({postsLength}) {
  return (
    <div className="header">
      <div className="headerTitles" style={{backgroundImage: `url(${hImageArray[postsLength]})`,
     backgroundSize: "100% 100%",
     backgroundRepeat: "no-repeat"
    }}>
        <span className="headerTitleSm">Lucienne & Rudolf hiking across England</span>
        <span className="headerTitleLg">Coast to Coast</span>
</div>

    </div>
  );
}
