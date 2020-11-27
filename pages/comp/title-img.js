import siteData from "../../site-info";
import Image from "next/image";

var Background = siteData["settings"].cover_image;


function Banner()
{
    console.log(Background);
    return (<>

     <div class="conatiner"> 
              
              <img class="hero-img" src={Background} /> 
        
              <div class="logo"> 
                    
                  <h1>{siteData["settings"].title}</h1> 
    <h4>{siteData["settings"].description}</h4> 
                 
              </div>
            </div>
    </>);
}

export default Banner;