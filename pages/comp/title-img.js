import siteData from "../../site-info";
import Image from "next/image";

var Background = siteData["settings"].cover_image;


function Banner()
{
    console.log(Background);
    return (<>

     <div class="conatiner"> 
              
              <img className="hero-img"  src={Background} /> 
        
              <div className="logo"> 
                    <img src={siteData["settings"].logo}/>
                 </div>

                 
              </div>
            
    </>);
}

export default Banner;