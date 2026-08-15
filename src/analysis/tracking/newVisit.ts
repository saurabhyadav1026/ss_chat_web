import api from "@/api/api";






  const newVisit = async () => {
     

      let latitude: any = "";
      let longitude: any = "";

      let deviceId = localStorage.getItem("sbhdeviceid") || "";
      if (deviceId === "undefined") {
        deviceId = "";
      }

      navigator.geolocation.getCurrentPosition(
         (position: any) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

        
            api.get("/newVisit", { params: { latitude, longitude, deviceId } })
            .then((res)=>{
                  if (res.data.newDevice) {
            localStorage.setItem("sbhdeviceid", res.data.deviceId);
          }

            })
        

              
        },
        (error: any) => {
         

          api.get("/newVisit", { params: { latitude, longitude, deviceId } })
           .then((res)=>{
                  if (res.data.newDevice) {
            localStorage.setItem("sbhdeviceid", res.data.deviceId);
          }

            })
        }
      );
    };


    export default newVisit;