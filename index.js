#!/usr/bin/env node

let shell = require('shelljs')
let colors = require('colors')
let fs = require('fs') 

//functions container

let appName = process.argv[2] //it  will pull the provided app name out of the parameters of our shell command.
let appDirectory = `${process.cwd()}/${appName}` //store the path to the directory that CRA is going to create.

const run = async () => {
  let success = await createReactApp()
  if(!success){
    console.log('Something went wrong while trying to create a new React app using create-react-app'.red)
    return false;
  }
  await cdIntoNewApp()
  await installPackages()
  await updateTemplates()
  console.log("All done")
}

run() 
const createReactApp = () => {
  return new Promise(resolve=>{
    if(appName){ //If appname provided then execute CRA command
      shell.exec(`create-react-app ${appName}`, () => {
        console.log("Created react app")
        resolve(true)
      })

    }else{
      console.log("\nNo app name was provided.".red)
      console.log("\nProvide an app name in the following format: ")
      console.log("\ncreate-plone-react-app ", "app-name\n".cyan)
        resolve(false)
    }
  })
}
// Display the most elegant way to cd.
/*
  let cdpath;
  if (appDirectory && path.join(appDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }
  */
const cdIntoNewApp = () => {
  return new Promise(resolve=>{
    shell.exec(`cd ${appName}`, ()=>{resolve()})
  })
}
const installPackages = () => {
  return new Promise(resolve=>{
    console.log("\n@plone/plone-react,plonetheme-webpack-plugin, webpack \n")
    shell.exec(`npm install --save  @plone/plone-react plonetheme-webpack-plugin webpack`, () => {
      console.log("\nFinished installing packages\n")
      resolve()
    })
  })
}
