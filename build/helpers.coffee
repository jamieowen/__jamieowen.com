fs = require "fs"
path = require "path"
process = require "child_process"

createNewProject = (name,template)->
  if not name
    throw new Error "No name specified."

  if not template
    throw new Error "No template specified."

  # fetch template folders
  templatePath = "./templates"
  templates = findFolders templatePath

  if templates.indexOf(template) == -1
    throw new Error "No template found with name '" + template + "'"

  projectsPath = "./projects"

  # copy template to projects path.
  command = "cp -r " + path.join(templatePath,template) + " " + path.join(projectsPath,name)
  process.exec( command )
  console.log "Created project '" + name + "'"

# return as list of folders/directories in a path
findFolders = (folderPath)->
  files = fs.readdirSync folderPath
  folders = []
  for file in files
    stat = fs.statSync( path.join(folderPath,file) )
    if stat.isDirectory()
      folders.push file

  return folders

persist =
  load:()->
    try
      previous = fs.readFileSync( ".persist.json")
    catch error

    if previous
      @data = JSON.parse previous
    else
      @data = {}

    null

  data:
    temp:""

  save:()->
    fs.writeFileSync ".persist.json",JSON.stringify(@data)
    null


module.exports =
  createNewProject:createNewProject
  findFolders:findFolders
  persist: persist














