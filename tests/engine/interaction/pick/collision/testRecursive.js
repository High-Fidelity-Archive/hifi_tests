// This is an automatically generated file, created by auto-tester on Aug 13 2018, 11:50

PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/sabrina-shanman/hifi_tests/safe-teleport-target/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

var testsRootPath = autoTester.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(testsRootPath + "engine/interaction/pick/collision/myavatar/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/many/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/identical/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/filter/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/cube/test.js");

autoTester.runRecursive();
