import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload'
import commonjs from '@rollup/plugin-commonjs';

export default {
  // This `main.js` file we wrote
    input: 'src/main.js',
    output: {
        sourcemap: true,
        // The destination for our bundled JavaScript
        file: 'public/build/bundle.js',
        // Our bundle will be an Immediately-Invoked Function Expression
        format: 'iife',
        // The IIFE return value will be assigned into a variable called `app`
        name: 'app',
    },
    plugins: [
        svelte({
        // Tell the svelte plugin where our svelte files are located
        include: 'src/**/*.svelte',
        }),
        // Tell any third-party plugins that we're building for the browser
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),
        serve(),
        livereload('public')
    ],
};


function serve() {
    let started = false;
  
    return {
      writeBundle() {
        if (!started) {
          started = true;
  
          require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true
          });
        }
      }
    };
  }
