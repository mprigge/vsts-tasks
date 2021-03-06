import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');
import util = require('../NugetMockHelper');

let taskPath = path.join(__dirname, '../..', 'nugetcommandmain.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
let nmh: util.NugetMockHelper = new util.NugetMockHelper(tmr);

nmh.setNugetVersionInputDefault();
tmr.setInput('command', 'restore');
tmr.setInput('solution', '**//*.pattern1;**//*.pattern2');

let a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
    "osType": {},
    "checkPath": {
        "c:\\agent\\home\\directory\\single.sln": true,
        "c:\\agent\\home\\directory\\double\\double.sln": true
    },
    "which": {},
    "exec": {
        "c:\\from\\tool\\installer\\nuget.exe restore c:\\agent\\home\\directory\\single.sln -NonInteractive": {
            "code": 0,
            "stdout": "NuGet output here",
            "stderr": ""
        },
       "c:\\from\\tool\\installer\\nuget.exe restore c:\\agent\\home\\directory\\double\\double.sln -NonInteractive": {
            "code": 0,
            "stdout": "NuGet output here",
            "stderr": ""
        }
    },
    "exist": {},
    "stats": {
        "c:\\agent\\home\\directory\\single.sln": {
            "isFile": true
        },
        "c:\\agent\\home\\directory\\double\\double.sln": {
            "isFile": true
        }
	}, 
    "findMatch": {
        "**//*.pattern1;**//*.pattern2" : ["c:\\agent\\home\\directory\\single.sln", "c:\\agent\\home\\directory\\double\\double.sln"]
    }
};
nmh.setAnswers(a);

nmh.registerNugetUtilityMock(["c:\\agent\\home\\directory\\single.sln", "c:\\agent\\home\\directory\\double\\double.sln"]);
nmh.registerDefaultNugetVersionMock();
nmh.registerToolRunnerMock();
nmh.registerNugetConfigMock();
nmh.registerNugetLocationHelpersMock();

tmr.run();
