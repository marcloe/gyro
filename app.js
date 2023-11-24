const containerElement = document.getElementById('container');
const wrapperElement = document.getElementById('wrapper');


function setupElements() {

    containerElement.style.height = window.innerHeight + 'px';
    containerElement.style.width = window.innerWidth + 'px';
  
/*     setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0); */
  
    wrapperElement.style.height = (containerElement.clientHeight * 0.5) + 'px';
    wrapperElement.style.width = (containerElement.clientWidth * 0.5) + 'px';
}

// - - - 

setupElements();



function handleOrientation(event) {
    updateFieldIfNotNull('Orientation_a', event.alpha);
    updateFieldIfNotNull('Orientation_b', event.beta);
    updateFieldIfNotNull('Orientation_g', event.gamma);
    incrementEventCount();
  }
  
  function incrementEventCount(){
    let counterElement = document.getElementById("num-observed-events")
    let eventCount = parseInt(counterElement.innerHTML)
    counterElement.innerHTML = eventCount + 1;
  }
  
  function updateFieldIfNotNull(fieldName, value, precision=10){
    if (value != null)
        if (value > 2) {
            wrapperElement.textContent = value.toFixed(precision);
        }
        else {
            wrapperElement.textContent = "You good";
        }

  }
  
  function handleMotion(event) {
  
    updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
    updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
    updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);
  
    updateFieldIfNotNull('Accelerometer_i', event.interval, 2);

    incrementEventCount();
  }
  
  let is_running = false;
  let demo_button = document.getElementById("start_demo");
  demo_button.onclick = function(e) {
    e.preventDefault();
    
    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }
    
    if (is_running){
      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("deviceorientation", handleOrientation);
      demo_button.innerHTML = "Start demo";
      demo_button.classList.add('btn-success');
      demo_button.classList.remove('btn-danger');
      is_running = false;
    }else{
      window.addEventListener("devicemotion", handleMotion);
      window.addEventListener("deviceorientation", handleOrientation);
      document.getElementById("start_demo").innerHTML = "Stop demo";
      demo_button.classList.remove('btn-success');
      demo_button.classList.add('btn-danger');
      is_running = true;
    }
  };
  
  /*
  Light and proximity are not supported anymore by mainstream browsers.
  window.addEventListener('devicelight', function(e) {
     document.getElementById("DeviceLight").innerHTML="AmbientLight current Value: "+e.value+" Max: "+e.max+" Min: "+e.min;
  });
  
  window.addEventListener('lightlevel', function(e) {
     document.getElementById("Lightlevel").innerHTML="Light level: "+e.value;
  });
  
  window.addEventListener('deviceproximity', function(e) {
     document.getElementById("DeviceProximity").innerHTML="DeviceProximity current Value: "+e.value+" Max: "+e.max+" Min: "+e.min;
  });
  
  window.addEventListener('userproximity', function(event) {
     document.getElementById("UserProximity").innerHTML="UserProximity: "+event.near;
  });
  */
