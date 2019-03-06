const spawn = require('child_process').spawn

spawn('prosv5', ['terminal'], { cwd: process.cwd(), shell: true, env: process.env, stdio: [0, 1, 2] })
