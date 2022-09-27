export const format_email = (name, email, cell, message) => {
    return `
         <div style='padding: 20px; font-family: Arial, Helvetica, sans-serif ; color:#333 ; background:#eee; border:1px #111; width: 650px; max-width: 700px; margin:auto'>
         <h3 style = 'border-radius: 5px ; background: #fff; padding: 20px;  border: 1px #ddd solid; text-align: center;'>Active Media | Contact Request</h3>
  
         <div style = 'background: #fff; padding: 20px;  border: 1px #ddd solid; margin-bottom:20px ;max-width:900px; margin:auto; margin-bottom: 30px;'>
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #eee; padding: 10px; min-width: 80px; margin-right: 20px'>Name : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px;' > ${name} </div>
             </div>
  
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #eee; padding: 10px; min-width: 80px; margin-right: 20px'>Email : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px;' > ${email} </div>
             </div>
  
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #eee; padding: 10px; min-width: 80px; margin-right: 20px'>Number : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px;' > ${cell} </div>
             </div>
  
             <div  style='display: flex; margin-bottom: 20px; align-items: baseline;'>
                     <div style='font-weight: 700; background: #eee; padding: 10px; min-width: 80px; margin-right: 20px'>Message : </div>
                     <div style=' background: rgba(0,0,0,.02); padding: 10px;' > ${message} </div>
             </div>
         </div>
  
         <footer style="font-family:Arial,Helvetica,sans-serif;background:#222;padding:5px 10px;color:#eee;display:flex">
              <div style="float:right;width:180px;display:flex;font-size:10px">
                  <p>Powered by </p>
                  <a href="http://www.activemi.co.za/" style="font-family:Arial,Helvetica,sans-serif;background:#222;color:#eee;margin-left:5px;margin-top:4px;margin-bottom:4px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.activemi.co.za/&amp;source=gmail&amp;ust=1648730988831000&amp;usg=AOvVaw1UeGwzyE9woOgqMZuFMQ1m">
                      <img src="https://ci5.googleusercontent.com/proxy/86Bfm_dYsZJPqVQcWILlIbii-sa2-d2M7J9SnSAqtH26b73RUEGB1e0Kl_K13RrVxfihBl10ie9b=s0-d-e1-ft#http://www.activemi.co.za/img/logo.png" alt="active media logo" style="object-fit:contain;object-position:center;min-width:40px;width:40px" class="CToWUd">
                  </a>
              </div>
          </footer>       
                 
     </div>
  
         `;
  };