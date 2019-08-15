// This shows a full config file!
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: './*.html',
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './*.css',
                        './index.html'
                    ]
                },
                options: {
                    watch: true,
                    server: './'
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // define default task
    grunt.registerTask('default', ['browserSync']);
};