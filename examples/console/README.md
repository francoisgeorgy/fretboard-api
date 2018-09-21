Execute on the command line:

    node_modules/babel-cli/bin/babel-node.js examples/console/example1.js 

with yarn:

    yarn babel examples/example1.js
    
Compile on the command line:    
     
    yarn babel examples/console/example1.js --out examples/console/compiled/example1.js
    yarn babel examples/console/example1.js --out-file examples/compiled/console/example1.compiled.js
    yarn babel examples/console/example1.js --presets=es2015 --out-file examples/console/example1.compiled.js
