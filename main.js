import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/loaders/RGBELoader.js';


//Resizing the Footer links



//This varibale will start or stop the rotation
let allowRotate;


//Start Button click
const arush_start_button = document.querySelector('.arush-start-button-container');
const click_here = document.querySelector('.clickhere');
const start_button = document.querySelector('.start-button');

const black_Background = document.querySelector('.start-button-container');
const rotation_button = document.querySelector('.rotation-button');

//Rotation button is clicked
let rotationClickedAgain = true;
let pop_up_rotation = true;
rotation_button.addEventListener('click',onRotationClick);
function onRotationClick(e){
  //console.log('rotationClickedAgain = ' + rotationClickedAgain);
  if(rotationClickedAgain){
    allowRotate = false;
    pop_up_rotation = allowRotate;
    rotationClickedAgain = false;
  } else {
    allowRotate = true;
    pop_up_rotation = allowRotate;
    rotationClickedAgain = true;
  }

}

rotation_button.addEventListener('mouseenter',()=>{
  rotation_button.style.backgroundColor = 'rgb(124, 120, 255)';
});
rotation_button.addEventListener('mouseleave',()=>{
  rotation_button.style.backgroundColor = 'rgb(255, 255, 0)';
});


black_Background.style.backgroundColor = 'black';

//Event listerner for clicking the start button
arush_start_button.addEventListener('click',onStartClick);
function onStartClick(event){
  black_Background.style.display = 'none';
  canvas.style.display = 'block';
}
//Event listner to change the color of the button on starting
arush_start_button.addEventListener('mouseenter',()=>{
  start_button.style.backgroundColor = 'rgb(153, 255, 0)';
})
arush_start_button.addEventListener('mouseleave',()=>{
  start_button.style.backgroundColor = 'rgb(0, 140, 255)';
})





const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const canvas = document.getElementById('canvas');


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/******************************   Camera and logo animation *************************** */

const logo = document.querySelectorAll('.logo');

logo.forEach(c => {
  c.addEventListener('mouseenter', () => {
    c.style.transform = 'scale(1.5)';
    c.style.transitionDuration = '0.4s';
  });

  c.addEventListener('mouseleave', () => {
    c.style.transform = 'scale(1)';
    c.style.transitionDuration = '0.4s';
  });
});


const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0,5,0);

function animateCamera() {
  gsap.to(camera.position, {
    x: 0,
    y: 2.15,
    z: 15,
    duration: 1,
    ease: "power2.out"
  });

  gsap.to(camera.position, {
    x: 0,
    y: 1.396,
    z: 9.776,
    duration: 0.5,
    ease: "power1.in",
    delay: 1
  });

  gsap.to(controls.target, {
    x: 0,
    y: 0,
    z: 0,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => controls.update()
  });

  //For logo Animation
  gsap.fromTo(logo, {
    opacity: 0,
    scale: 0
  }, {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)",
    stagger: 0.15
  });

  //For Arush_Start_Button_Animation
  gsap.fromTo(arush_start_button, {
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: 3,
    duration: 0.5,
    onComplete :()=>{
      // Remove the listener immediately
      window.removeEventListener('click', animateCamera);
      arush_start_button.style.display = 'none';
    }
  });

  
  //start rotatign the globe
  allowRotate =  true;
}

// Add listener once
window.addEventListener('click', animateCamera);


/************************************    RENDERS ************************* */
const renderer = new THREE.WebGLRenderer({ 
  canvas : canvas,
  antialias: true 
});
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

/****************************   Controls ***************8 */
const controls = new OrbitControls(camera, renderer.domElement);

/****************************          Lights            ************** */


// Ambient light (soft fill)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
scene.add(ambientLight);

//Hemisphere Light
const sun_light = new THREE.HemisphereLight( 0xffffbb, 0x481278, 1 );
sun_light.position.set(-15.274,1.123,-16.39);
scene.add( sun_light );


// Array of image paths
const skyboxImages = [
  './The_Globe_Media/sky_17_2k/sky_17_cubemap_2k/px.png',
  './The_Globe_Media/sky_17_2k/sky_17_cubemap_2k/nx.png',
  './The_Globe_Media/sky_17_2k/sky_17_cubemap_2k/py.png',
  './The_Globe_Media/sky_17_2k/sky_17_cubemap_2k/ny.png',
  './The_Globe_Media/sky_17_2k/sky_17_cubemap_2k/pz.png',
  './The_Globe_Media/sky_17_2k/sky_17_cubemap_2k/nz.png'
];

const skyloader = new THREE.CubeTextureLoader();
const skyboxTexture = skyloader.load(skyboxImages);

// Set as scene background
scene.background = skyboxTexture;

/*******************************LOGO ANIMATION */


/***************************       Ray Casting ************************* */
const clickable_Object = [
  'AircraftProject',
  'ThreejsProjects',
  'Crowd_Dynamics',
  'Chess_Hobbies',
  'Books_Hobbies',
  'Animation_Hobbies',
  'About_me',
  'TicTacToe_Project',
  'Speed_Cubing_Hobbies',
  'RubiksCubeWebsite',
  'Notes',
  'Movies_Hobbies',
  'Laser_Chess_Website',
  'CloseFOAM',
  'PINN'
];

let popupOpen = false;

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

window.addEventListener('mousedown', onMouseClick, false);

function onMouseClick(event) {
  // Calculate mouse position in normalized device coordinates (NDC)
  // (-1 to +1) for both axes
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 3. Update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // 4. Calculate intersections
  // 'scene.children' is the list of objects to check
  // 'true' means it checks all descendants of the objects recursively
  const intersects = raycaster.intersectObjects(scene.children, true);

  // 5. Check if any objects were intersected
  if (intersects.length > 0 && !popupOpen) {
  const obj = intersects[0].object;
    if(clickable_Object.includes(obj.name)){

      const color = obj.material.color.getHex();;

      // Reset color (optional)
      if (obj.material) {
        obj.material.color.setHex(0xff0000);
      }

      // Bounce scale
      gsap.fromTo(
        obj.scale,
        { x: 1, y: 1, z: 1 },
        {
          x: 2,
          y: 2,
          z: 2,
          duration: 0.1,
          ease: "back.out(0.5)",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            if (obj.material) {
              obj.material.color.setHex(color); // reset AFTER bounce
              //Now we will show the modal
              showModal(obj.name);
              popupOpen = true;
            }
          }
        }
      );
      
    }
  } 
}

/****************************************************** POP UP */
const pop_up_container = document.querySelector('.pop-up-position');


const modalContent = {
  'AircraftProject' : {
    title : 'AE643 Project',
    content: '<p>This is a group project from an Aeromodelling course where we were supposed to design an aircaft. We came up with a design having two fuselage, .A downloadable report corresponding to this project is given below.</p>',
    link : './The_Globe_Media/AE463_Report.pdf',
    Image : './The_Globe_Media/AE463_Pop_up_Image.jpg'
  },
  'ThreejsProjects' : {
    title: "Arush's World",
    content: '<p>This project uses <b>Three.js</b> and <b>Blender</b> to build a large-scale immersive world showcasing my major and minor projects. Because of its scale, the website does not support touchscreen devices. I recommend using a desktop or laptop with dedicated graphics support for the best experience. </p><p>I’ve also created a walkthrough video of the website, which you can watch <a href="https://youtu.be/AdNtfu5lp4s?si=aMQ9R6WwgSWLmpR3" target="_blank">Here</a></p>',
    link : 'https://walkthrougharush.vercel.app/',
    Image : './The_Globe_Media/ArushsWorld.png'
  },
  'Crowd_Dynamics' : {
    title: "Crowd Dynamics",
    content: "<p>This is my first undegraduate project and this was an attempt to simulate the huge's pedestrain flow usign the Finite Difference Method in <b>Matlab</b>. The Project is still on going. And the github page that explains about my proiect is given below.",
    link: 'https://arushraju.github.io/Human-Flow/',
    Image:"./The_Globe_Media/CrowdDynamics.jpg"
  },
  'RubiksCubeWebsite':{
    title:"NNN Rubiks Cube Solver",
    content : "<p>This is my first full stack project where I created the algorithm in <b>C++</b>, desinged the frontend in <b>Javascript</b>, used <b>Node.js</b> to make the backend and deployed a fully function Rubiks cube solver website. The algorithm can solve any dimensional rubiks (not just 3 by 3). You can find the link to the website below.",
    link:"https://not-necessarily-normal-rubiks-cube-solver.onrender.com/",
    Image:"./The_Globe_Media/NNNSolver.png"
  },
  'Laser_Chess_Website':{
    title:"Prism's Gambit",
    content : "<p>This is my second full stack project where I built the alogrithm in <b>C++</b>, desinged the frontend in <b>Javascript</b>, used <b>Node.js</b> to make the backend and deployed a fully functional Laser Chess website. The depth of engine can practically go up to 5. You can find the link to the website below.",
    link: "https://prisms-gambit.onrender.com/",
    Image:'./The_Globe_Media/PrismGambit.png'
  },
  'TicTacToe_Project':{
    title:"Tic Tac Toe with Feynman",
    content : "<p>This project is an implementation of a Tic-Tac-Toe solver built using <b>Qiskit</b>, a quantum programming library in Python. It applies Grover’s algorithm to identify the optimal move for a given board state.While the problem itself is computationally trivial and the quantum approach is not efficient compared to classical methods, this project was developed as an exploration of applying quantum algorithms to game logic. The link to the GitHub Page is provided below.</p>",
    link: 'https://arushraju.github.io/Tic-Tac-Toe-with-Feynman/',
    Image : './The_Globe_Media/QC_TicTacToe_Wallpaper.jpeg'
  },
  'CloseFOAM':{
    title:"CLoseFOAM",
    content:"<p>This project is an attampt to make a software that has the capability to solve fluid simulation problems using finite diference method, particularly Marker and Cell scheme, entirely written in <b>C</b>. But the unique part of about the project was that I have tried using <b>OpenCV</b> to take image as an input, in order to solve the problem, rather than a CAD model. The github page explainign about the project is given below.",
    link:"https://arushraju.github.io/CloseFOAM/",
    Image:"./The_Globe_Media/CloseFOAM.png"
  },
  'PINN':{
    title:"Gortler's Boundary Layer using PINN",
    content:"<p>Here I have solved the Gortler's Transformation using Physicvs informaed neural network",
    link:"https://github.com/arushraju/AE646",
    Image:"./The_Globe_Media/PINN.png"
  },
  'Notes':{
    title:'Study Notes',
    content:"I have curated all my notes of all the subjects I have learnt and made a website where you can find them all. THe link to webpage is given below.",
    link:"",
    Image:""
  },
  'About_me':{
    title:"Hey there!",
    content:"This is Arush a final year Aerospace Undergad in Indian Institue of Technology Kanpur. Give below are the links to my social media handles. I would be happy to connet wiht you.<ol><li><p>Linked In : <a href='https://in.linkedin.com/in/arush-chinchkhede' target='_blank'>Link</a></p></li><li><p>Github : <a href='https://github.com/arushraju' target='_blank'>Link</a></p></li><li><p>Email : <a href='mailto:arushc123@gmail.com' target=''>Link</a></p></li><li><p>Youtube : <a href='https://youtube.com/@arush_chinchkhede' target='_blank'>Link</a></p></li>",
    link:"",
    Image:""
  },
  'Speed_Cubing_Hobbies':{
    title:"Speed Cubing!",
    content:"Rubis Cube is an integral part of my body.",
    link:"",
    Image:""
  },
  'Books_Hobbies':{
    title:"Books!",
    content:"<p>I like reading books and some of my recommendations are <br><ul><li>The courage to be Disliked</li><li>Atomic Habits</li><li>The subtle art of not giving a F*ck</li><li>Ikigai</li><li>The Pyscology of Money</li></ul></p>"
  },
  'Chess_Hobbies':{
    title:"Chess!",
    content:"I like playing Chess.Given below is my profile of chess.com. Jpin me and we will learn this game together.",
    link:"https://www.chess.com/member/arushification",
    Image:""
  },
  'Animation_Hobbies':{
    title:"Animation",
    content:"I also like to animate. And animation was the resoan I leanrt blender. Now it has been around three ysers since i started learnignbldner, and all my previous projects in blender is prent in a github repository link to which is given below.",
    link:"",
    Image:""
  },
  'Movies_Hobbies':{
    title:"Movies!",
    content:"I enjoy watching movies, and I created a website showcasing a collection of films I personally enjoyed. Please note that the website contains background music.",
    link:"https://arushraju.github.io/Arushs-Movies/",
    Image:"./The_Globe_Media/Movies_Colllage.webp"
  }
}

const modal_title = document.querySelector('.heading');
const modal_image = document.querySelector('.the-image');
const modal_content = document.querySelector('.content');
const modal_link = document.querySelector('.the-link');


function showModal(id){
  if(pop_up_rotation)allowRotate = !allowRotate;
  
  pop_up_container.style.display = 'block';
  const content = modalContent[id];
  if(content){
    modal_title.textContent = content.title;
    modal_content.innerHTML = content.content;
    //Image

    //Links
    modal_image.src = content.Image;
    if(
      id ==  'Speed_Cubing_Hobbies' ||
      id ==  'Books_Hobbies' ||
      id == 'About_me'
    ){
      modal_link.style.display = 'none';
    }else{
      modal_link.style.display = 'block';
      modal_link.href = content.link;
    }
    
  }
}

const exit_button = document.querySelector('.exit-button');
exit_button.addEventListener('click',()=>{
  pop_up_container.style.display = 'none';
  if(pop_up_rotation)allowRotate = !allowRotate;
  popupOpen = false;
})

/***************************     Loading the GLB File     ************************* */
let model; // store reference

const loader = new GLTFLoader();
loader.load(
  './Mesh.glb',
  (gltf) => {
    gltf.scene.traverse((child)=>{
      //console.log(child);
    })
    model = gltf.scene;
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('GLB load error:', error);
  }
);


//To control the zoom
controls.enableZoom = true;
controls.minDistance = 5;   // closest zoom
controls.maxDistance = 15;  // farthest zoom
controls.enableDamping = true;
controls.dampingFactor = 0.08;


/***************************    Animate the frames    ************************** */
function animate() {
  requestAnimationFrame(animate);
  


  //console.log('allowRotate = ' + allowRotate);

  if (model && allowRotate) {
    model.rotation.y += 0.004;
  }

  //console.log(camera.position);
  
  controls.update()
  
  renderer.render(scene, camera);
}


animate();
