path      = require 'path'
helpers   = require './build/helpers'
stitch    = require 'stitch'
fs        = require 'fs'


helpers.persist.load()


module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    watch:
      options:
        nospwan: true
      # files added in registerTask method.
      files:[]
      tasks:["onChange"]

    projectOutput: "Test"


  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', =>
    console.log "Run with task identifier.."
    null

  grunt.registerTask 'new',helpers.createNewProject

  # allow for switchable watch tasks on projects.
  grunt.registerTask 'dev',(project)->
    projectsPath = "./projects"
    allProjects = helpers.findFolders( projectsPath )

    if allProjects.indexOf(project) == -1
      throw new Error "Projects '" + project + "' does not exist."

    watchPath = path.join projectsPath,project
    watchFiles = [ path.join(watchPath,"src/**/*.coffee") ]

    grunt.config.data.watch.files = watchFiles

    helpers.persist.data.projectsPath = watchPath
    helpers.persist.save()

    grunt.task.run ['watch']
    null

  grunt.registerTask "onChange",()->
    done = @async()
    watchPath = helpers.persist.data.projectsPath
    sourcePath = path.join(watchPath,"/src/coffee")
    outputPath = path.join(watchPath,"/public/js/main.js")

    console.log "onChange",sourcePath

    pkg = stitch.createPackage( {paths:[sourcePath]} )

    pkg.compile (err,source)->
      throw err if err
      fs.writeFileSync outputPath,source
      console.log "Written to:", outputPath
      done()

    null


