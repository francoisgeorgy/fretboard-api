Execute on the command line:

    node_modules/babel-cli/bin/babel-node.js examples/example1.js 

with yarn:

    yarn babel examples/example1.js
    
Compile on the commane line:    
     
    yarn babel examples/example1.js --out examples/compiled/example1.js
    yarn babel examples/example1.js --out-file examples/compiled/example1.compiled.js
    yarn babel examples/example1.js --presets=es2015 --out-file examples/example1.compiled.js
