export const format_email = (name, indoor_or_outdoor, event_name, num_of_people , image_link) => {
    return `
         <div style='padding: 20px; font-family: Arial, Helvetica, sans-serif ; color:#eee ; background:#111; border:1px #111; width: 650px; max-width: 700px; margin:auto'>
         <h3 style = 'border-radius: 5px ; background: #222; padding: 20px;  border: 1px #ddd solid; text-align: center;'>Misguided | Table Booking</h3>
            <p style="text-align:center ; display:flex ; justify-content:center"> 
            <img src="${image_link}" alt="active media logo" style="object-fit:contain;object-position:center;min-width:150px;width:150px ; margin: 0 auto ; " class="CToWUd">
            </p>
  
         <div style = 'background: #222; padding: 20px;  border: 1px #ddd solid; margin-bottom:20px ;max-width:900px; margin:auto; margin-bottom: 30px;'>

            <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Event Name : </div>
                <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${event_name} </div>
            </div>

             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Name : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${name} </div>
             </div>
  
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Indoor or Outdoor : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${indoor_or_outdoor} </div>
             </div>
  
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Number of People at Table : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${num_of_people} </div>
             </div>
         </div>
  
         
         </div>
         
         `;
};