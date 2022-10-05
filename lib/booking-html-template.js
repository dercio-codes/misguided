export const format_booking_email = (formattedData) => {
    return `
         <div style='padding: 20px; font-family: Arial, Helvetica, sans-serif ; color:#eee ; background:#111; border:1px #111; width: 650px; max-width: 700px; margin:auto'>
         <h3 style = 'border-radius: 5px ; background: #222; padding: 20px;  border: 1px #ddd solid; text-align: center;'>Misguided | Artist Booking</h3>
  
         <div style = 'background: #222; padding: 20px;  border: 1px #ddd solid; margin-bottom:20px ;max-width:900px; margin:auto; margin-bottom: 30px;'>

         
         <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Name : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.name} </div>
             </div>

             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Email : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.email} </div>
             </div>

  
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Phone Number : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.tel} </div>
             </div>


             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Requested Artist : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.requested_artist} </div>
             </div>


             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Event Date : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.event_date} </div>
             </div>


             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                 <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Event Name : </div>
                 <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.event_name} </div>
             </div>

 
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                 <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Event Location : </div>
                 <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.event_location} </div>
             </div>


             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                 <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Hospitality : </div>
                 <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.hospitality} </div>
             </div>


             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                 <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Set Time : </div>
                 <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.set_time} </div>
             </div>

             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                 <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Duration : </div>
                 <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.duration} </div>
             </div>

             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                 <div style='font-weight: 700; background: #111; padding: 10px; min-width: 50%; margin-right: 20px ; flex: 1 !important ; text-align:right '>Budget : </div>
                 <div style=' background: rgba(0,0,0,.02); padding: 10px; flex:2 !important' > ${formattedData.budget} </div>
             </div>


         </div>
  
         
         </div>
         
         `;
};