// function startLightSensor() {
//     if ( 'AmbientLightSensor' in window ) {
//         const sensor = new AmbientLightSensor();
//         sensor.addEventListener('reading', event => {
//           console.log('Current light level:', sensor.illuminance);
//         });
//         sensor.addEventListener('error', event => {
//           console.log(event.error.name, event.error.message);
//         });
//         sensor.start();
//       } else {
//           console.log("no ambient light sensor");
//       }
// }

// https://www.w3.org/TR/ambient-light/
// need to enable extended sensor access
// chrome://flags/#enable-generic-sensor-extra-classes
function ambientLight() {
    navigator.permissions.query({ name: 'ambient-light-sensor' }).then(result => {
      // console.log("ambient permission state " + result.state);
      if (result.state === 'denied') {
          console.log('Permission to use ambient light sensor is denied.');
          return;
      }

      const als = new AmbientLightSensor({frequency: 10});
      als.addEventListener('activate', () => console.log('Ready to measure EV.'));
      als.addEventListener('error', event => console.log(`Error: ${event.error.name}`));
      als.addEventListener('reading', () => {
          // Defaut ISO value.
          // const ISO = 100;
          // Incident-light calibration constant.
          // const C = 250;

          // let EV = Math.round(Math.log2((als.illuminance * ISO) / C));
          console.log(`Illuminance value is: ${als.illuminance}`);
          // console.log(`Exposure Value (EV) is: ${EV}`);
          // if (EV >= 6) {
          //   setLightTheme();
          // }
          // if (EV <= 4) {
          //   setDarkTheme();
          // }

          // https://en.wikipedia.org/wiki/Lux#Illuminance
          if(autoTheme) {
            if (als.illuminance < 20) {
              setDarkTheme();
            } else if (als.illuminance > 50) {
              setLightTheme();
            }
          }
      });

      als.start();
      
    }, 
    // rejected
    reason => {
      // console.log(reason);
    });

}

function isAmbientSensorAvailable() {
  return new Promise((resolve, reject) => {
    navigator.permissions.query({ name: 'ambient-light-sensor' }).then(result => {
      if (result.state === 'denied') {
          // console.log('Permission to use ambient light sensor is denied.');
          // return false;
          reject();
      } else {
        resolve();
      }
    },
    reason => {
      // console.log("check on failed" + reason);
      // return false;
      reject();
    }).catch((error) => {
      // couldn't query the permission
      // console.error("catched error: "+ error);
      // return false;
      reject();
    });
    // return true;
    // resolve();
  });
  
}