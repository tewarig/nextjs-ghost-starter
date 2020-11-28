import siteData from "../../site-info";
import Image from "next/image";

var Background = siteData["settings"].cover_image;


function Banner()
{
    console.log(Background);
    return (<>

     <div className="hero-bg"> 
              
              <img src={Background} class="hero-image"/> 

        
               
                 <div class="hero-logo">   
            <img src={siteData["settings"].logo} class="hero-logo" />
            </div>

                 
              </div>
            
    </>);
}

export default Banner;