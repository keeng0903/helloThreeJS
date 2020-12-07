
var app = function(){
    // initiallize scene, camera, objects and renderer

    var scene, camera, renderer, cube;

    var init_app = function() {
        // 1. create the scene
        scene = new THREE.Scene();

        scene.fog = new THREE.Fog(0xFFFFFF, 10, 100);
        // create background
        scene.background = new THREE.Color(0xd6d6d6);
        scene.background = new THREE.TextureLoader().load("data/textures/people.jpg");

        // 2. create an locate the camera
        var canvasWidth = 1280, canvasHeight = 720;
        var feilfOfViewY = 60, aspectRatio = canvasWidth/ canvasHeight, near=1.0, far=100.0;
        camera = new THREE.PerspectiveCamera(feilfOfViewY, aspectRatio, near, far);
        camera.position.z = 5;
        
        // 3.create and locate the objects on the scene

        pattern = new THREE.TextureLoader().load("data/textures/alpha-texture.jpg");
        pattern1 = new THREE.TextureLoader().load("data/textures/pattern1.jpg");
        pattern2 = new THREE.TextureLoader().load("data/textures/pattern2.jpg");

        // const geometry2 = new THREE.BoxGeometry(1,1,1);
        // const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff});
        // cube = new THREE.Mesh( geometry2, material2);
        // cube.position.x = -3;

        const geometry_torus = new THREE.TorusGeometry( 10, 3, 16, 100 );
        // const material_torus = new THREE.MeshBasicMaterial( { color: 0xffff00, transparent: true, opacity: 0.8 } );
        const material_torus = new THREE.MeshBasicMaterial({color: 0xffff00, alphaMap: pattern, transparent: true,});
        torus = new THREE.Mesh( geometry_torus, material_torus );
        torus.position.z = -40
        torus.position.x = -25
        scene.add( torus );

        const geometry_cone = new THREE.ConeGeometry( 4, 10, 100 );
        // const material_cone = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const material_cone = new THREE.MeshBasicMaterial({ map: pattern1});
        cone = new THREE.Mesh( geometry_cone, material_cone );
        cone.position.z = -15; 
        scene.add( cone );

        const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        // const material_cylinder = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const material_cylinder = new THREE.MeshBasicMaterial({ map: pattern2});
        cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
        cylinder.position.x = 25;
        cylinder.position.z = -40; 
        scene.add( cylinder );

        // scene.add(cube);
        scene.add(cube);

        
        // create an AudioListener and add it to the camera
        const listener = new THREE.AudioListener();
        camera.add( listener );
    
        // create a global audio source
        const sound = new THREE.Audio( listener );
    
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'data/sounds/ambient.ogg', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });

        // 4. create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( canvasWidth, canvasHeight);
        document.body.appendChild(renderer.domElement);

    };

    // main animation loop - calls every 50-60ms.
    var mainLoop = function(){
        requestAnimationFrame(mainLoop);
        cone.rotation.x += 0.03;
        cone.rotation.y += 0.03;
   
        cylinder.rotation.x += 0.02;
        cylinder.rotation.y += 0.02;

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        renderer.render(scene,camera);
    };
    init_app();
    mainLoop();
}