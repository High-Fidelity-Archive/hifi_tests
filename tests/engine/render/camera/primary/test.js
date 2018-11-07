if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("MyAvatar scaling", Script.resolvePath("."), "primary", function(testType) {
    var LIFETIME = 120;
	var createdEntities = [];
    var position = autoTester.getOriginFrame();
	
    autoTester.addStep("Create zone and model", function () {
        var assetsRootPath = autoTester.getAssetsRootPath();
     
        createdEntities.push(Entities.addEntity({
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: autoTester.getOriginFrame(),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: { x: 0.0, y: -0.70710678118, z: -0.70710678118 }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        }));

        createdEntities.push(Entities.addEntity({
            lifetime: LIFETIME,
            type: "Model",
            modelURL: assetsRootPath + 'models/obj_models/testTransparent.obj',
            position: Vec3.sum(position, {x: 0.0, y: 1.75, z: -2.2 }),   
            rotation: Quat.fromPitchYawRollDegrees(45.0, 45.0, 0.0),    
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        }));
    });
    autoTester.addStepSnapshot("Snapshot - 1920x1036, 45 degrees");

    autoTester.addStep("Change position", function () {
        Camera.mode = "first person";
        MyAvatar.goToLocation({ x: MyAvatar.position.x - 0.8,  y: MyAvatar.position.y, z: MyAvatar.position.z + 1.0 }, false);
    });
    autoTester.addStepSnapshot("Position has moved back and left");

    autoTester.addStep("Change orientation", function () {
        MyAvatar.goToLocation(MyAvatar.position, true, Quat.fromPitchYawRollDegrees(5.0, -25.0, 0.0));
    });
    autoTester.addStepSnapshot("Orientation tilted up and yawed right");
    
    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    autoTester.runTest(testType);
});