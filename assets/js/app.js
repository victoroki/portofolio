/* -----------------------------------------------
   Particles.js Config — Dark Mode Constellation
----------------------------------------------- */

particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 85,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": ["#818cf8", "#38bdf8", "#a5b4fc", "#22d3ee"]
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.9,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 0.8,
        "opacity_min": 0.3,
        "sync": false
      }
    },
    "size": {
      "value": 3.0,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 1.0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 130,
      "color": "#818cf8",
      "opacity": 0.4,
      "width": 1.2
    },
    "move": {
      "enable": true,
      "speed": 1.6,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "attract": {
        "enable": false
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 180,
        "line_linked": {
          "opacity": 0.5
        }
      },
      "push": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
});